<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . '/../../helpers/normalizeDateDMY.php');
require_once (__DIR__ . '/../../validators/dateValidator.php');
require_once (__DIR__ . '/../../validators/integerValidator.php');
require_once (__DIR__ . '/../../validators/appointment/insertCostumerValidator.php');
require_once (__DIR__ . '/../../models/appointment/GetAppointmentModel.php');
class GetAppointmentController {
    public function getReservedAppointments($userId, $date) {
        $formatedDate = normalizeDateDMY($date);
        $validateUserId = integerValidator((int)$userId);
        $validateDate = dateValidator($formatedDate);
        try {
            $getAppointmentModel = new GetAppointmentModel();
            $result = $getAppointmentModel->getReservedAppointments($validateUserId['id'], $validateDate['date']);
            
            // Extract just the time values for backward compatibility
            $appointmentTimes = array_column($result, 'time');
            
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Zakazani termini su uspešno dobavljeni',
                "data" => $appointmentTimes,
                "detailedData" => $result // Include full appointment details for future use
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }

    public function getClientAppointments($data) {
        $validateInputs = insertCostumerValidator($data);
        try {
            $getAppointmentModel = new GetAppointmentModel();
            $response = $getAppointmentModel->getClientAppointments($validateInputs);
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Zakazani termini su uspešno dobavljeni',
                "data" => $response
                
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>