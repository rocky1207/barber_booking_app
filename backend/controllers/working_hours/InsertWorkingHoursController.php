<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../../models/working_hours/InsertWorkingHoursModel.php');
require_once (__DIR__ . '/../../validators/integerValidator.php');
require_once (__DIR__ . '/../../validators/dateValidator.php');
require_once (__DIR__ . '/../../validators/timeValidator.php');

class InsertWorkingHoursController {
    public function insertWorkingHours($data) {
        $validateUserId = integerValidator($data['userId']);
        $validateStartDate = dateValidator($data['start_date']);
        $validateEndDate = dateValidator($data['end_date']);
        $validateStartTime = timeValidator($data['start_time']);
        $validateEndTime = timeValidator($data['end_time']);
        
        $insertWorkingHoursData = [
            'userId' => $validateUserId['id'],
            'start_date' => $validateStartDate['date'],
            'end_date' => $validateEndDate['date'],
            'start_time' => $validateStartTime['time'],
            'end_time' => $validateEndTime['time']
        ];
        try {
            $insertWorkingHoursModel = new InsertWorkingHoursModel();
            $workingHoursData = $insertWorkingHoursModel->insertWorkingHours($insertWorkingHoursData);
            
            return [
                "success" => true,
                "status" => 200,
                "message" => "Radni sati su uspešno uneseni.",
                "data" => $workingHoursData
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>


