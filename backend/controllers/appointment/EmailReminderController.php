<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . '/../../models/appointment/SendEmailReminderModel.php');
require_once (__DIR__ . '/../../models/appointment/GetEmailReminderModel.php');

class EmailReminderController {
    
    /**
     * Šalje email podsetnike za sve appointment-e sutra
     */
    public function sendTomorrowReminders() {
        try {
            $sendEmailModel = new SendEmailReminderModel();
            $result = $sendEmailModel->sendAllTomorrowReminders();
            
            return [
                "success" => true,
                "status" => 200,
                "message" => "Email podsetnici su uspešno poslati.",
                "data" => [
                    "sentCount" => $result['sentCount'],
                    "totalCount" => $result['totalCount'],
                    "errors" => $result['errors']
                ]
            ];
            
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    
    /**
     * Dohvata appointment-e koji treba podsetnik za sutra (za pregled)
     */
    public function getTomorrowReminders() {
        try {
            $getReminderModel = new GetEmailReminderModel();
            $appointments = $getReminderModel->getAppointmentsForTomorrowReminder();
            
            return [
                "success" => true,
                "status" => 200,
                "message" => "Appointment-i za podsetnik su uspešno dohvaćeni.",
                "data" => $appointments
            ];
            
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    
    /**
     * Test funkcija - šalje podsetnik za specifičan datum
     */
    public function sendRemindersForDate($date) {
        try {
            // Validacija datuma
            $dateObj = DateTime::createFromFormat('Y-m-d', $date);
            if (!$dateObj || $dateObj->format('Y-m-d') !== $date) {
                AppController::createMessage('Neispravan format datuma. Očekujem Y-m-d format.', 400);
            }
            
            $getReminderModel = new GetEmailReminderModel();
            $appointments = $getReminderModel->getAppointmentsForDate($date);
            
            if (empty($appointments)) {
                return [
                    "success" => true,
                    "status" => 200,
                    "message" => "Nema appointment-a za navedeni datum.",
                    "data" => []
                ];
            }
            
            $sendEmailModel = new SendEmailReminderModel();
            $sentCount = 0;
            $errors = [];
            
            foreach ($appointments as $appointment) {
                try {
                    $sendEmailModel->sendReminderEmail($appointment);
                    $sentCount++;
                } catch (Exception $e) {
                    $errors[] = "Greška za {$appointment['name']} {$appointment['surname']}: " . $e->getMessage();
                }
            }
            
            return [
                "success" => true,
                "status" => 200,
                "message" => "Email podsetnici za datum {$date} su uspešno poslati.",
                "data" => [
                    "sentCount" => $sentCount,
                    "totalCount" => count($appointments),
                    "errors" => $errors
                ]
            ];
            
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    
    /**
     * Test funkcija - šalje podsetnik jednom klijentu
     */
    public function sendTestReminder($costumerId) {
        try {
            // Validacija ID-a
            if (!is_numeric($costumerId) || $costumerId <= 0) {
                AppController::createMessage('Neispravan ID klijenta.', 400);
            }
            
            $getReminderModel = new GetEmailReminderModel();
            $appointments = $getReminderModel->getAppointmentsForTomorrowReminder();
            
            $targetAppointment = null;
            foreach ($appointments as $appointment) {
                if ($appointment['costumerId'] == $costumerId) {
                    $targetAppointment = $appointment;
                    break;
                }
            }
            
            if (!$targetAppointment) {
                AppController::createMessage('Klijent sa navedenim ID-om nema zakazan termin sutra.', 404);
            }
            
            $sendEmailModel = new SendEmailReminderModel();
            $sendEmailModel->sendReminderEmail($targetAppointment);
            
            return [
                "success" => true,
                "status" => 200,
                "message" => "Test email podsetnik je uspešno poslat klijentu {$targetAppointment['name']} {$targetAppointment['surname']}.",
                "data" => $targetAppointment
            ];
            
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>

