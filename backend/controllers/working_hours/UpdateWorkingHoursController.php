<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../../models/working_hours/UpdateWorkingHoursModel.php');

class UpdateWorkingHoursController {
    public function updateWorkingHours($id, $data) {
        try {
            $updateWorkingHoursModel = new UpdateWorkingHoursModel();
            $workingHoursData = $updateWorkingHoursModel->updateWorkingHours($id, $data);
            
            return [
                "success" => true,
                "status" => 200,
                "message" => "Radni sati su uspešno ažurirani.",
                "data" => $workingHoursData
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>


