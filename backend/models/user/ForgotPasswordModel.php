<?php
require_once (__DIR__ . '/../../vendor/autoload.php');
require_once (__DIR__  . '/../../controllers/AppController.php');
require_once (__DIR__  . '/../DatabaseModel.php');



use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class ForgotPasswordModel {
    private const MAX_RESET_PER_USER_PER_HOUR = 500;  // koliko tokena po korisniku / sat
    private const MAX_RESET_PER_IP_PER_HOUR = 500;   // koliko zahteva po IP / sat
    private const RATE_WINDOW = '1 HOUR';          // interval koji koristimo u SQL
    private $smtpHost;
    private $smtpPort;
    private $smtpUsername;
    private $smtpPassword;
    private $fromEmail;
    private $fromName;
    private $businessPhone;
    private $businessName;
    private $userId;
    private $link;
    private $rawToken;
    
    public function __construct() {
        // Učitaj konfiguraciju iz .env fajla
        $this->smtpHost = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
        $this->smtpPort = $_ENV['SMTP_PORT'] ?? 587;
        $this->smtpUsername = $_ENV['SMTP_USERNAME'] ?? '';
        $this->smtpPassword = $_ENV['SMTP_PASSWORD'] ?? '';
        $this->fromEmail = $_ENV['SMTP_FROM_EMAIL'] ?? '';
        $this->fromName = $_ENV['SMTP_FROM_NAME'] ?? 'Akademija Đorđe';
        $this->businessPhone = $_ENV['BUSINESS_PHONE'] ?? '+381641311893';
        $this->businessName = $_ENV['BUSINESS_NAME'] ?? 'Akademija Đorđe';
        

    }
    public function forgotPassword($data) {
        $selectUserQuery = 'SELECT id, username, user_email FROM user WHERE user_email = :user_email LIMIT 1';
        $deleteOldTokenQuery = 'DELETE FROM password_resets WHERE user_id = :user_id';
        $insertNewTokenQuery = 'INSERT INTO password_resets 
        (user_id, token_hash, expires_at) VALUES (:user_id, :token_hash, :expires_at)';
        
        $ip = $this->getClientIp();
        $user = null;
        $userId = null;
        
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            
            // 1) Proveri da li korisnik postoji
            $selectEmailStmt = DatabaseModel::$pdo->prepare($selectUserQuery);
            $selectEmailStmt->execute(["user_email" => $data["email"]]);
            $user = $selectEmailStmt->fetch();
            
            if(!$user) {
                // Email ne postoji u bazi - ne logujemo u password_reset_requests
                // Samo logujemo grešku u email_error_log
                $errorMsg = 'Ukoliko postoji korisnik sa unetim emailom, primićete email sa uputstvom.';
                $this->logEmailError('error', $errorMsg, 'forgot_password_flow', null, $data['email']);
                DatabaseModel::$pdo->rollBack();
                throw new Exception($errorMsg, 422);
            }
            
            $userId = $user["id"];
            $this->userId = $userId;
            
            // 2) Proveri rate limits (baca Exception 429 ako je prekoračen)
            try {
                $this->isRateLimited($userId, $ip);
            } catch (Exception $e) {
                // Rate limit prekoračen - logujemo u password_reset_requests (email je validan)
                // i u email_error_log
                $this->logPasswordResetRequest($userId, $ip);
                $this->logEmailError('error', $e->getMessage(), 'forgot_password_flow', $userId, $data['email']);
                DatabaseModel::$pdo->rollBack();
                throw $e;
            }
            
            // 3) Loguj pokušaj u password_reset_requests (email je validan, rate limit OK)
            // Ovo radimo pre glavnih operacija da bismo zabeležili pokušaj čak i ako se desi greška kasnije
            $this->logPasswordResetRequest($userId, $ip);
            
            // 4) Obriši stare tokene
            $deleteOldTokenStmt = DatabaseModel::$pdo->prepare($deleteOldTokenQuery);
            $deleteOldTokenStmt->execute(["user_id" => $userId]);
            
            // 5) Kreiraj novi token
            $this->rawToken = bin2hex(random_bytes(32));
            $tokenHash = hash('sha256', $this->rawToken);
            $expiresAt = (new DateTime('+1 hour'))->format('Y-m-d H:i:s');
            
            $insertNewTokenStmt = DatabaseModel::$pdo->prepare($insertNewTokenQuery);
            $insertNewTokenStmt->execute([
                "user_id" => $userId,
                "token_hash" => $tokenHash,
                "expires_at" => $expiresAt
            ]);
            
            if($insertNewTokenStmt->rowCount() === 0) {
                $errorMsg = 'Unos novog tokena nije uspeo';
                $this->logEmailError('error', $errorMsg, 'forgot_password_flow', $userId, $data['email']);
                DatabaseModel::$pdo->rollBack();
                throw new Exception($errorMsg, 422);
            }

            // 6) Pošalji email
            $this->link = "http://localhost:3000/reset-password?token={$this->rawToken}&user_id={$userId}";
            $userEmailData = [
                "username" => $user["username"],
                "user_email" => $user["user_email"],
            ];
            
            $response = $this->sendRecoveryPasswordEmail($userEmailData);
            $isRecoveryPasswordEmailSent = $response['success'] ?? false;
            
            if(!$isRecoveryPasswordEmailSent) {
                // Email nije poslat - već je logovano u sendRecoveryPasswordEmail
                // Rollback transakcije
                DatabaseModel::$pdo->rollBack();
                return [
                    'success' => false,
                    'status' => $response['status'],
                    'message' => $response['message'],
                ];
            }
            
            // 7) Sve je uspešno - commit transakcije
            // password_resets tabela već sadrži token, što je dokaz da je operacija uspešna
            DatabaseModel::$pdo->commit();
            
            return ['success' => true, 'user' => $user];
            
        } catch (Exception $e) {
            // Rollback transakcije ako je još uvek aktivna
            if (isset(DatabaseModel::$pdo) && DatabaseModel::$pdo->inTransaction()) {
                DatabaseModel::$pdo->rollBack();
            }
            
            // Loguj grešku ako još nije logovana
            // (neke greške su već logovane u specifičnim delovima koda)
            if (!isset($user) || $user === false) {
                // Greška je već logovana gore kada user ne postoji
            } else {
                // Loguj grešku koja nije već obrađena
                $this->logEmailError('error', $e->getMessage(), 'forgot_password_flow', $userId ?? null, $data['email'] ?? null);
            }
            
            throw $e;
        }
    }

    private function getClientIp() {
        // osnovno: ako stoji iza reverse proxy, moraš podesiti X-Forwarded-For pravilno
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
    /**
     * Loguje pokušaj resetovanja lozinke u password_reset_requests tabelu.
     * Ova metoda se poziva samo kada email postoji u bazi (validan email).
     */
    private function logPasswordResetRequest($userId, $ip) {
        if ($userId === null) {
            // Ne logujemo ako user ne postoji (email nije validan)
            return;
        }
        
        try {
            $sql = "INSERT INTO password_reset_requests (user_id, ip) VALUES (:user_id, :ip)";
            $logPdo = $this->createLoggingPdo();
            $stmt = $logPdo->prepare($sql);
            $stmt->execute([
                'user_id' => $userId,
                'ip' => $ip
            ]);
        } catch (Throwable $e) {
            // Ne bacamo exception jer ovo je logging operacija
            // Greška će biti logovana u email_error_log ako je potrebno
        }
    }
    
/**
 * Check rate limits for user and ip. Throws Exception with code 429 if limited.
 */
    private function isRateLimited($userId, $ip) {
        // NOTE: use same time window string as constant
        $interval = self::RATE_WINDOW; // e.g. '1 HOUR'

        // 1) per-user (only if userId is provided)
        if ($userId !== null) {
            $sqlUser = "
                SELECT COUNT(*) as cnt FROM password_reset_requests
                WHERE user_id = :user_id
                AND created_at >= (NOW() - INTERVAL $interval)
            ";
           // $stmt = DatabaseModel::$pdo->prepare($sqlUser);

            $logPdo = $this->createLoggingPdo();
           
            $stmt = $logPdo->prepare($sqlUser);
            $stmt->execute(['user_id' => $userId]);
            $cntUser = (int)$stmt->fetchColumn();
            if ($cntUser >= self::MAX_RESET_PER_USER_PER_HOUR) {
                throw new Exception('Previše resetovanja lozinke. Pokušajte kasnije ponovo.', 429);
            }
        }

        // 2) per-IP
        $sqlIp = "
            SELECT COUNT(*) as cnt FROM password_reset_requests
            WHERE ip = :ip
            AND created_at >= (NOW() - INTERVAL $interval)
        ";
        //$stmt = DatabaseModel::$pdo->prepare($sqlIp);

    $logPdo = $this->createLoggingPdo();
           
            $stmt = $logPdo->prepare($sqlIp);
        $stmt->execute(['ip' => $ip]);
        $cntIp = (int)$stmt->fetchColumn();
        if ($cntIp >= self::MAX_RESET_PER_IP_PER_HOUR) {
            throw new Exception('Previše zahteva sa ove IP addrese. Pokušajte kasnije ponovo.', 429);
        }

        
    }

    private function sendRecoveryPasswordEmail($userEmailData) {
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
            $mail->addAddress($userEmailData["user_email"], $userEmailData["username"]);

            $mail->isHtml(true);
            $mail->Subject = 'Link za kreiranje nove lozinke - ' . $this->businessName;
            $mail->Body = $this->generateEmailBody($userEmailData["username"]);

            $mail->send();
            return ['success' => true];
        } catch (Exception $e) {
            $msg = $e->getMessage();
            $status = $e->getCode() ?: 500;
            // Loguj grešku u email_error_log
            $this->logEmailError('error', $msg, 'forgot_password_email', $this->userId ?? null, $userEmailData['user_email'] ?? null);
            
            return ['success' => false, 'message' => $msg, 'status' => $status];
        }
    }

    public function logEmailError($level, $message, $context = null, $userId = null, $email = null) {
        $saved = false;
        $emailErrorLogQuery = "INSERT INTO email_error_log (level, context, message, user_id, email) 
                    VALUES (:level, :context, :message, :user_id, :email)";
        try {
           $logPdo = $this->createLoggingPdo();
           // $stmt = DatabaseModel::$pdo->prepare($emailErrorLogQuery);
            $stmt = $logPdo->prepare($emailErrorLogQuery);
            $saved = $stmt->execute([
                'level'   => $level,
                'context' => $context,
                'message' => $message,
                'user_id' => $userId,
                'email'   => $email
            ]);
           
        //return;
        } catch (Throwable $e) {$saved = false;}

        try {
            $logDir = __DIR__ . '/../../tmp/reset_password_email_error_log';
            if(!is_dir($logDir)) {@mkdir($logDir, 0777, true);};
            $logFile = $logDir . '/email_error_log.log';
           // $time = (new DateTime('now', new DateTimeZone('UTC')))->format('Y-m-d H:i:s');
            $time = (new DateTime())->format('Y-m-d H:i:s');
            $payload = [
                'time' => $time,
                'level' => $level,
                'context' => $context,
                'message' => $message,
                'user_id' => $userId,
                'email' => $email
            ];
            file_put_contents($logFile, '['.$time.'] '.json_encode($payload, JSON_UNESCAPED_UNICODE). PHP_EOL, FILE_APPEND);
        } catch (Throwable $_) {

        };
        return $saved;
    }
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
    private function generateEmailBody($username) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background-color: #f9f9f9; }
                .link-details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #3498db; }
                .services-list { margin: 10px 0; }
                .total { font-weight: bold; font-size: 1.1em; color: #e74c3c; }
                .footer { text-align: center; padding: 20px; background-color: #34495e; color: white; }
                .contact-info { margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Email za resetovanje lozinke</h1>
                    <h2>{$this->businessName}</h2>
                </div>
                
                <div class='content'>
                    <p>Poštovani/a <strong>{$username}</strong>,</p>
                    
                    <p>Kliknite na link ispod ovog teksta koji će Vas odvesti na stranicu za kreiranje nove lozinke..</p>
                    
                    <div class='link-details'>
                        <p>Link: <a>{$this->link}</a></p>
                    </div>
                </div>
                
                <div class='footer'>
                    <p><strong>{$this->businessName}</strong></p>
                    <p>Kontakt: {$this->businessPhone}</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
}
/*
Stavi expires_at u DB tip koji podržava timezone po potrebi
Dobra je praksa da expires_at bude DATETIME u UTC ili TIMESTAMP i da jasno znaš šta očekuješ. 
U bootstrap-u si već postavio timezone, što je OK, ali u produkciji je često bolje čuvati UTC.

Rate limiting / anti-abuse
Dodaj limit koliko reset tokena može da se kreira po korisniku / po IP u jedinici vremena 
da ne bi neko spamovao endpoint.

Zabeleži IP / user-agent uz token (opciono)
U password_resets tabelu možeš dodati ip i user_agent kolone — to pomaže u investigaciji zloupotreba.

Koristi stroži tip za token_hash u DB
token_hash stavi kao CHAR(64) (sha256 hex) ili binary odgovarajuću veličinu, 
i indeksiraj ga ako budeš tražio po hashu.

Logovanje grešaka / monitoring
Ako email ne može da se pošalje, zabeleži to u log fajl (ili u email_reminder_log / sličnu tabelu) 
sa razlogom — trenutno bacaš exception gore, ali poželjno je i logovati grešku server-side.

Dodaj tz-aware datetime i testove
Testiraj expires_at generisanje i poređenje u bazi (npr. expires_at > NOW()).
*/
?>

