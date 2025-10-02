<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../../vendor/autoload.php');
require_once (__DIR__ . '/../../helpers/formatDateForEmail.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class SendEmailReminderModel {
    
    private $smtpHost;
    private $smtpPort;
    private $smtpUsername;
    private $smtpPassword;
    private $fromEmail;
    private $fromName;
    private $businessPhone;
    private $businessName;
    
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
    
    /**
     * Šalje email podsetnik klijentu
     */
    public function sendReminderEmail($appointmentData) {
        try {
            $mail = new PHPMailer(true);
            
            // SMTP konfiguracija
            $mail->isSMTP();
            $mail->Host = $this->smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $this->smtpUsername;
            $mail->Password = $this->smtpPassword;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $this->smtpPort;
            $mail->CharSet = 'UTF-8';
            
            // Pošiljalac
            $mail->setFrom($this->fromEmail, $this->fromName);
            
            // Primaoc
            $mail->addAddress($appointmentData['email'], $appointmentData['name'] . ' ' . $appointmentData['surname']);
            
            // Sadržaj email-a
            $mail->isHTML(true);
            $mail->Subject = 'Podsetnik za zakazani termin - ' . $this->businessName;
            $mail->Body = $this->generateEmailBody($appointmentData);
            $mail->AltBody = $this->generatePlainTextBody($appointmentData);
            
            $mail->send();
            return true;
            
        } catch (Exception $e) {
            throw new Exception("Greška prilikom slanja email-a: " . $e->getMessage(), 500);
        }
    }
    
    /**
     * Generiše HTML sadržaj email-a
     */
    private function generateEmailBody($appointmentData) {
        $formattedDate = formatDateForEmail($appointmentData['date']);
        
        $servicesList = '';
        $totalPrice = 0;
        foreach ($appointmentData['services'] as $service) {
            $formattedTime = formatTimeForEmail($service['time']);
            $servicesList .= "<li><strong>{$service['name']}</strong> - {$formattedTime}h - {$service['price']} RSD</li>";
            $totalPrice += $service['price'];
        }
        
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
                .appointment-details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #3498db; }
                .services-list { margin: 10px 0; }
                .total { font-weight: bold; font-size: 1.1em; color: #e74c3c; }
                .footer { text-align: center; padding: 20px; background-color: #34495e; color: white; }
                .contact-info { margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Podsetnik za zakazani termin</h1>
                    <h2>{$this->businessName}</h2>
                </div>
                
                <div class='content'>
                    <p>Poštovani/a <strong>{$appointmentData['name']} {$appointmentData['surname']}</strong>,</p>
                    
                    <p>Ovim putem Vas podsećamo da imate zakazan termin <strong>sutra, {$formattedDate}</strong>.</p>
                    
                    <div class='appointment-details'>
                        <h3>Detalji termina:</h3>
                        <p><strong>Datum:</strong> {$formattedDate}</p>
                        <p><strong>Frizer:</strong> {$appointmentData['barberName']}</p>
                        
                        <h4>Zakazane usluge:</h4>
                        <ul class='services-list'>
                            {$servicesList}
                        </ul>
                        
                        <p class='total'>Ukupno: {$totalPrice} RSD</p>
                    </div>
                    
                    <p>Molimo Vas da dođete na vreme. U slučaju da ne možete da dođete, molimo Vas da nas kontaktirate.</p>
                    
                    <div class='contact-info'>
                        <p><strong>Kontakt telefon:</strong> {$this->businessPhone}</p>
                    </div>
                    
                    <p>Hvala Vam na poverenju!</p>
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
    
    /**
     * Generiše plain text sadržaj email-a
     */
    private function generatePlainTextBody($appointmentData) {
        $formattedDate = formatDateForEmail($appointmentData['date']);
        
        $servicesList = '';
        $totalPrice = 0;
        foreach ($appointmentData['services'] as $service) {
            $formattedTime = formatTimeForEmail($service['time']);
            $servicesList .= "- {$service['name']} - {$formattedTime}h - {$service['price']} RSD\n";
            $totalPrice += $service['price'];
        }
        
        return "
PODSETNIK ZA ZAKAZANI TERMIN
{$this->businessName}

Poštovani/a {$appointmentData['name']} {$appointmentData['surname']},

Ovim putem Vas podsećamo da imate zakazan termin sutra, {$formattedDate}.

DETALJI TERMINA:
Datum: {$formattedDate}
Frizer: {$appointmentData['barberName']}

ZAKAZANE USLUGE:
{$servicesList}

Ukupno: {$totalPrice} RSD

Molimo Vas da dođete na vreme. U slučaju da ne možete da dođete, molimo Vas da nas kontaktirate.

Kontakt telefon: {$this->businessPhone}

Hvala Vam na poverenju!

---
{$this->businessName}
Kontakt: {$this->businessPhone}
        ";
    }
    
    /**
     * Šalje podsetnike za sve appointment-e sutra
     */
    public function sendAllTomorrowReminders() {
        try {
            require_once (__DIR__ . '/GetEmailReminderModel.php');
            $getReminderModel = new GetEmailReminderModel();
            $appointments = $getReminderModel->getAppointmentsForTomorrowReminder();
            
            $sentCount = 0;
            $errors = [];
            
            foreach ($appointments as $appointment) {
                try {
                    $this->sendReminderEmail($appointment);
                    $sentCount++;
                } catch (Exception $e) {
                    $errors[] = "Greška za {$appointment['name']} {$appointment['surname']}: " . $e->getMessage();
                }
            }
            
            return [
                'sentCount' => $sentCount,
                'totalCount' => count($appointments),
                'errors' => $errors
            ];
            
        } catch (Exception $e) {
            throw $e;
        }
    }
}
?>
