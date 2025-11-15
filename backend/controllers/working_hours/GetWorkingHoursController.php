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
            /*
            if(empty($workingHours)) {
                throw new Exception('Nema unetih radnih sati', 404);
            }*/
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
            if(!$workingHours) {
                throw new Exception("Radni sati sa ID {$id} nisu pronađeni.", 404);
            }
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
           if(!$workingHours) {
                throw new Exception('Nema rezultata za navedene parametre.', 404);
            }
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
            if(empty($workingHours)) {
                throw new Exception('Nema rezultata.', 404);
            }
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


