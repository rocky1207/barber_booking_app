<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../../models/working_hours/DeleteWorkingHoursModel.php');
require_once (__DIR__ . '/../../validators/integerValidator.php');
class DeleteWorkingHoursController {
    public function deleteWorkingHours($id) {
        $validateInputs = integerValidator($id);
        try {
            $deleteWorkingHoursModel = new DeleteWorkingHoursModel();
            //$deleteWorkingHoursModel->deleteWorkingHours($validateInputs['id']);
            $deletedWorkingHoursId = $deleteWorkingHoursModel->deleteWorkingHours($validateInputs['id']);
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Unos radnih sati je uspešno obrisan.',
                "data" => ['id' => (int)$deletedWorkingHoursId]
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>


