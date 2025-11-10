<?php
require_once (__DIR__ . '/../../vendor/autoload.php');
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class AdminSecurityAlertModel {
    private const ALERT_THRESHOLD_FAILED_ATTEMPTS = 10; // Koliko pokušaja pre nego što pošaljemo alert
    private const ALERT_THRESHOLD_RATE_LIMIT = 5;      // Koliko rate limit prekoračenja pre alerta
    private const ALERT_COOLDOWN_MINUTES = 60;         // Ne šalji alert češće od jednom na sat
    
    private $smtpHost;
    private $smtpPort;
    private $smtpUsername;
    private $smtpPassword;
    private $fromEmail;
    private $fromName;
    private $adminEmail;
    
    public function __construct() {
        $this->smtpHost = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
        $this->smtpPort = $_ENV['SMTP_PORT'] ?? 587;
        $this->smtpUsername = $_ENV['SMTP_USERNAME'] ?? '';
        $this->smtpPassword = $_ENV['SMTP_PASSWORD'] ?? '';
        $this->fromEmail = $_ENV['SMTP_FROM_EMAIL'] ?? '';
        $this->fromName = $_ENV['SMTP_FROM_NAME'] ?? 'Akademija Đorđe';
        $this->adminEmail = $_ENV['ADMIN_EMAIL'] ?? $this->fromEmail; // Email admina za alertove
    }
    
    /**
     * Proverava da li treba poslati alert adminu i šalje ga ako je potrebno
     * Poziva se nakon svakog pokušaja resetovanja lozinke
     */
    public function checkAndSendSecurityAlert($ip, $email = null, $userId = null, $errorType = null) {
        try {
            $logPdo = $this->createLoggingPdo();
            
            // Proveri koliko je bilo pokušaja u poslednjih 1 sat
            $recentAttempts = $this->getRecentFailedAttempts($logPdo, $ip, $email, $userId);
            
            // Proveri da li je već poslat alert u poslednjih ALERT_COOLDOWN_MINUTES minuta
            if ($this->wasAlertSentRecently($logPdo, $ip)) {
                return false; // Ne šalji alert previše često
            }
            
            $shouldAlert = false;
            $alertReason = '';
            
            // Proveri različite scenarije za alert
            if ($recentAttempts['total'] >= self::ALERT_THRESHOLD_FAILED_ATTEMPTS) {
                $shouldAlert = true;
                $alertReason = "Previše pokušaja resetovanja lozinke";
            } elseif ($recentAttempts['rateLimitExceeded'] >= self::ALERT_THRESHOLD_RATE_LIMIT) {
                $shouldAlert = true;
                $alertReason = "Prekoračenje rate limita";
            } elseif ($recentAttempts['invalidEmails'] >= 5) {
                $shouldAlert = true;
                $alertReason = "Pokušaji sa nepostojećim email adresama";
            }
            
            if ($shouldAlert) {
                $this->sendSecurityAlert($ip, $email, $userId, $alertReason, $recentAttempts);
                $this->logAlertSent($logPdo, $ip, $alertReason);
                return true;
            }
            
            return false;
        } catch (Throwable $e) {
            // Ne bacamo exception jer ovo je sekundarna operacija
            error_log("AdminSecurityAlertModel error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Dohvata statistiku nedavnih pokušaja
     */
    private function getRecentFailedAttempts($pdo, $ip, $email = null, $userId = null) {
        $oneHourAgo = date('Y-m-d H:i:s', strtotime('-1 hour'));
        
        $stats = [
            'total' => 0,
            'rateLimitExceeded' => 0,
            'invalidEmails' => 0,
            'emailErrors' => 0
        ];
        
        // Ukupan broj pokušaja sa ove IP u poslednjih 1 sat
        $sql = "
            SELECT COUNT(*) as cnt 
            FROM password_reset_requests 
            WHERE ip = :ip 
            AND created_at >= :one_hour_ago
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['ip' => $ip, 'one_hour_ago' => $oneHourAgo]);
        $stats['total'] = (int)$stmt->fetchColumn();
        
        // Broj rate limit prekoračenja
        $sql = "
            SELECT COUNT(*) as cnt 
            FROM email_error_log 
            WHERE context = 'forgot_password_flow' 
            AND message LIKE '%Previše%' 
            AND (email = :email OR user_id = :user_id)
            AND created_at >= :one_hour_ago
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'email' => $email ?? '',
            'user_id' => $userId ?? null,
            'one_hour_ago' => $oneHourAgo
        ]);
        $stats['rateLimitExceeded'] = (int)$stmt->fetchColumn();
        
        // Broj pokušaja sa nepostojećim email adresama
        $sql = "
            SELECT COUNT(*) as cnt 
            FROM email_error_log 
            WHERE context = 'forgot_password_flow' 
            AND message LIKE '%Ukoliko postoji korisnik%' 
            AND email = :email
            AND created_at >= :one_hour_ago
        ";
        if ($email) {
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['email' => $email, 'one_hour_ago' => $oneHourAgo]);
            $stats['invalidEmails'] = (int)$stmt->fetchColumn();
        }
        
        // Broj grešaka pri slanju emaila
        $sql = "
            SELECT COUNT(*) as cnt 
            FROM email_error_log 
            WHERE context = 'forgot_password_email' 
            AND created_at >= :one_hour_ago
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['one_hour_ago' => $oneHourAgo]);
        $stats['emailErrors'] = (int)$stmt->fetchColumn();
        
        return $stats;
    }
    
    /**
     * Proverava da li je alert već poslat nedavno
     */
    private function wasAlertSentRecently($pdo, $ip) {
        $cooldownMinutes = self::ALERT_COOLDOWN_MINUTES;
        $sql = "
            SELECT COUNT(*) as cnt 
            FROM email_error_log 
            WHERE context = 'admin_security_alert' 
            AND message LIKE :ip_pattern
            AND created_at >= DATE_SUB(NOW(), INTERVAL :cooldown MINUTE)
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'ip_pattern' => "%IP: $ip%",
            'cooldown' => $cooldownMinutes
        ]);
        $count = (int)$stmt->fetchColumn();
        return $count > 0;
    }
    
    /**
     * Loguje da je alert poslat
     */
    private function logAlertSent($pdo, $ip, $reason) {
        try {
            $sql = "INSERT INTO email_error_log (level, context, message, user_id, email) 
                    VALUES (:level, :context, :message, :user_id, :email)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                'level' => 'alert',
                'context' => 'admin_security_alert',
                'message' => "Security alert sent. IP: $ip. Reason: $reason",
                'user_id' => null,
                'email' => null
            ]);
        } catch (Throwable $e) {
            // Ignorišemo grešku logovanja
        }
    }
    
    /**
     * Šalje security alert email adminu
     */
    private function sendSecurityAlert($ip, $email, $userId, $reason, $stats) {
        try {
            $mail = new PHPMailer(true);
            
            $mail->isSMTP();
            $mail->Host = $this->smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $this->smtpUsername;
            $mail->Password = $this->smtpPassword;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $this->smtpPort;
            $mail->CharSet = 'UTF-8';
            
            $mail->setFrom($this->fromEmail, $this->fromName);
            $mail->addAddress($this->adminEmail);
            
            $mail->isHTML(true);
            $mail->Subject = '🚨 Security Alert - Pokušaji resetovanja lozinke';
            $mail->Body = $this->generateAlertEmailBody($ip, $email, $userId, $reason, $stats);
            
            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Failed to send admin security alert: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Generiše HTML sadržaj alert emaila
     */
    private function generateAlertEmailBody($ip, $email, $userId, $reason, $stats) {
        $time = date('Y-m-d H:i:s');
        $statsHtml = "
            <ul>
                <li><strong>Ukupno pokušaja (1h):</strong> {$stats['total']}</li>
                <li><strong>Rate limit prekoračenja:</strong> {$stats['rateLimitExceeded']}</li>
                <li><strong>Nepostojeći emailovi:</strong> {$stats['invalidEmails']}</li>
                <li><strong>Greške pri slanju emaila:</strong> {$stats['emailErrors']}</li>
            </ul>
        ";
        
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #e74c3c; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background-color: #f9f9f9; }
                .alert-box { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; }
                .info-box { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #3498db; }
                .footer { text-align: center; padding: 20px; background-color: #34495e; color: white; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>🚨 Security Alert</h1>
                    <h2>Pokušaji resetovanja lozinke</h2>
                </div>
                
                <div class='content'>
                    <div class='alert-box'>
                        <h3>⚠️ Razlog alerta:</h3>
                        <p><strong>{$reason}</strong></p>
                    </div>
                    
                    <div class='info-box'>
                        <h3>📋 Detalji incidenta:</h3>
                        <p><strong>IP adresa:</strong> {$ip}</p>
                        <p><strong>Email:</strong> " . ($email ?? 'N/A') . "</p>
                        <p><strong>User ID:</strong> " . ($userId ?? 'N/A') . "</p>
                        <p><strong>Vreme:</strong> {$time}</p>
                    </div>
                    
                    <div class='info-box'>
                        <h3>📊 Statistika (poslednji 1 sat):</h3>
                        {$statsHtml}
                    </div>
                    
                    <div class='alert-box' style='background-color: #d1ecf1; border-left-color: #0c5460;'>
                        <h3>🔍 Šta treba da uradite:</h3>
                        <ol style='text-align: left; padding-left: 20px;'>
                            <li><strong>Proverite da li je ovo legitiman pokušaj:</strong>
                                <ul style='margin-top: 5px;'>
                                    <li>Da li korisnik sa ovim emailom postoji u sistemu?</li>
                                    <li>Da li je korisnik nedavno kontaktirao support?</li>
                                    <li>Da li je IP adresa poznata (npr. iz vaše kancelarije)?</li>
                                </ul>
                            </li>
                            <li><strong>Analizirajte logove u bazi:</strong>
                                <ul style='margin-top: 5px;'>
                                    <li>Pregledajte tabelu <code>password_reset_requests</code> za detalje pokušaja</li>
                                    <li>Pregledajte tabelu <code>email_error_log</code> za greške</li>
                                </ul>
                            </li>
                            <li><strong>Preduzmite akciju:</strong>
                                <ul style='margin-top: 5px;'>
                                    <li><strong>Ako je legitiman:</strong> Kontaktirajte korisnika i pomozite mu</li>
                                    <li><strong>Ako je napad:</strong> Razmotrite blokadu IP adrese na serveru</li>
                                    <li><strong>Ako niste sigurni:</strong> Primetite aktivnost i nastavite praćenje</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    
                    <div class='info-box' style='background-color: #f8f9fa;'>
                        <h3>💡 SQL upiti za analizu:</h3>
                        <pre style='background-color: #e9ecef; padding: 10px; border-radius: 4px; font-size: 12px; overflow-x: auto;'>
-- Svi pokušaji sa ove IP u poslednja 24h
SELECT * FROM password_reset_requests 
WHERE ip = '{$ip}' 
AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
ORDER BY created_at DESC;

-- Sve greške vezane za ovaj email
SELECT * FROM email_error_log 
WHERE email = '" . ($email ?? '') . "' 
AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
ORDER BY created_at DESC;
                        </pre>
                    </div>
                </div>
                
                <div class='footer'>
                    <p>Automatski alert sistem</p>
                    <p>{$this->fromName}</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
    
    /**
     * Kreira PDO konekciju za logovanje (izolovana od glavne transakcije)
     */
    private function createLoggingPdo() {
        $host = $_ENV['DB_HOST'] ?? '127.0.0.1';
        $db   = $_ENV['DB_NAME'] ?? 'your_db';
        $user = $_ENV['DB_USER'] ?? 'root';
        $pass = $_ENV['DB_PASS'] ?? '';
        $dsn = "mysql:host={$host};dbname={$db};charset=utf8mb4";
        $opts = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new PDO($dsn, $user, $pass, $opts);
    }
}
?>

