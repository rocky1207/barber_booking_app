<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . '/../../models/appointment/EmailReminderSchedulerModel.php');

class EmailReminderSchedulerController {
    
    /**
     * Podešava email reminder event scheduler
     */
    public function setupEmailReminderScheduler() {
        try {
            $schedulerModel = new EmailReminderSchedulerModel();
            
            // Kreiraj log tabelu
            $schedulerModel->createEmailReminderLogTable();
            
            // Podešava event scheduler
            $schedulerModel->setupEmailReminderEventWithHttp();
            
            return [
                "success" => true,
                "status" => 200,
                "message" => "Email reminder scheduler je uspešno podešen.",
                "data" => [
                    "schedulerEnabled" => $schedulerModel->isEventSchedulerEnabled(),
                    "events" => $schedulerModel->getEmailReminderEvents()
                ]
            ];
            
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    
    /**
     * Dohvata status scheduler-a
     */
    public function getSchedulerStatus() {
        try {
            $schedulerModel = new EmailReminderSchedulerModel();
            
            return [
                "success" => true,
                "status" => 200,
                "message" => "Status scheduler-a je uspešno dohvaćen.",
                "data" => [
                    "schedulerEnabled" => $schedulerModel->isEventSchedulerEnabled(),
                    "events" => $schedulerModel->getEmailReminderEvents(),
                    "logs" => $schedulerModel->getEmailReminderLogs(10)
                ]
            ];
            
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    
    /**
     * Dohvata logove email podsetnika
     */
    public function getEmailReminderLogs($limit = 50) {
        try {
            $schedulerModel = new EmailReminderSchedulerModel();
            $logs = $schedulerModel->getEmailReminderLogs($limit);
            
            return [
                "success" => true,
                "status" => 200,
                "message" => "Logovi email podsetnika su uspešno dohvaćeni.",
                "data" => $logs
            ];
            
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    
    /**
     * Ručno pokreće slanje email podsetnika (za testiranje)
     */
    public function runEmailRemindersNow() {
        try {
            require_once (__DIR__ . '/EmailReminderController.php');
            $emailController = new EmailReminderController();
            $result = $emailController->sendTomorrowReminders();
            
            // Loguj rezultat
            $schedulerModel = new EmailReminderSchedulerModel();
            $schedulerModel->logEmailReminderResult(
                'sent', 
                'Email reminders sent manually', 
                $result['data']['sentCount'], 
                count($result['data']['errors'])
            );
            
            return $result;
            
        } catch (Exception $e) {
            // Loguj grešku
            $schedulerModel = new EmailReminderSchedulerModel();
            $schedulerModel->logEmailReminderResult('error', $e->getMessage());
            
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>

