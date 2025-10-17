<?php
require_once (__DIR__ . '/../../validators/integerValidator.php');
require_once (__DIR__ . '/../../models/appointment/DeleteClientAppointmentModel.php');
class DeleteClientAppointmentController {
    public function deleteClientAppointment($id) {
        $validateInputs = integerValidator($id);
        
        try {
            $deleteClientAppointmentModel = new DeleteClientAppointmentModel();
            $result = $deleteClientAppointmentModel->deleteClientAppointment($validateInputs['id']);
            var_dump($result);
            exit();
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
        
        
    }
}
?>