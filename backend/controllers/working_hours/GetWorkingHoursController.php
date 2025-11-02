<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../../models/working_hours/GetWorkingHoursModel.php');
require_once (__DIR__ . '/../../validators/integerValidator.php');
require_once (__DIR__ . '/../../validators/dateValidator.php');

class GetWorkingHoursController {
    public function getWorkingHoursByUserId($userId) {
        $validateInputs = integerValidator($userId);
        try {
            $getWorkingHoursModel = new GetWorkingHoursModel();
            $workingHours = $getWorkingHoursModel->getWorkingHoursByUserId($validateInputs['id']);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Radni sati su uspešno dohvaćeni.",
                "data" => $workingHours
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    
    public function getWorkingHoursById($id) {
        $validateInputs = integerValidator($id);
        try {
            $getWorkingHoursModel = new GetWorkingHoursModel();
            $workingHours = $getWorkingHoursModel->getWorkingHoursById($validateInputs['id']);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Radni sati su uspešno dohvaćeni.",
                "data" => $workingHours
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    
    public function getWorkingHoursForDate($userId, $date) {
        $validateUserId = integerValidator($userId);
        $validateDate = dateValidator($date);
        try {
            $getWorkingHoursModel = new GetWorkingHoursModel();
            $workingHours = $getWorkingHoursModel->getWorkingHoursForDate($validateUserId['id'], $validateDate['date']);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Radni sati za datum su uspešno dohvaćeni.",
                "data" => $workingHours
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    
    public function getAllWorkingHours() {
        try {
            $getWorkingHoursModel = new GetWorkingHoursModel();
            $workingHours = $getWorkingHoursModel->getAllWorkingHours();
            return [
                "success" => true,
                "status" => 200,
                "message" => "Svi radni sati su uspešno dohvaćeni.",
                "data" => $workingHours
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>


