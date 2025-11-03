<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../../models/working_hours/UpdateWorkingHoursModel.php');
require_once (__DIR__ . '/../../validators/integerValidator.php');
require_once (__DIR__ . '/../../validators/dateValidator.php');
require_once (__DIR__ . '/../../validators/timeValidator.php');

class UpdateWorkingHoursController {
    public function updateWorkingHours($data) {
        $validateId = integerValidator($data['id']);
        $validateStartDate = dateValidator($data['start_date']);
        $validateEndDate = dateValidator($data['end_date']);
        $validateStartTime = timeValidator($data['start_time']);
        $validateEndTime = timeValidator($data['end_time']);
        $updateWorkingHoursData = [
            'id' => $validateId['id'],
            'start_date' => $validateStartDate['date'],
            'end_date' => $validateEndDate['date'],
            'start_time' => $validateStartTime['time'],
            'end_time' => $validateEndTime['time']
        ];
        try {
            $updateWorkingHoursModel = new UpdateWorkingHoursModel();
            //$workingHoursData = $updateWorkingHoursModel->updateWorkingHours($id, $data);
            $workingHoursData = $updateWorkingHoursModel->updateWorkingHours($updateWorkingHoursData);
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


