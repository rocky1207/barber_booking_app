<?php
require_once (__DIR__ . '/../../validators/integerValidator.php');
require_once (__DIR__ . '/../../models/appointment/DeleteClientAppointmentModel.php');
class DeleteClientAppointmentController {
    public function deleteClientAppointment($id) {
        $validateInputs = integerValidator($id);
        try {
            $deleteClientAppointmentModel = new DeleteClientAppointmentModel();
            $response = $deleteClientAppointmentModel->deleteClientAppointment($validateInputs['id']);
            if($response) {
                return [
                "success" => true,
                "status"  => 200,
                "message" => 'Zakazani termin je uspešno obrisan',
                "data" => ['deletedAppointmentId' => $response]
            ];
            } else {
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            }
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>