<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . '/../../helpers/normalizeDateDMY.php');
require_once (__DIR__ . '/../../validators/dateValidator.php');
require_once (__DIR__ . '/../../validators/integerValidator.php');
require_once (__DIR__ . '/../../models/appointment/GetAppointmentModel.php');
class GetAppointmentController {
    public function getReservedAppointments($userId, $date) {
        $formatedDate = normalizeDateDMY($date);
        $validateUserId = integerValidator((int)$userId);
        $validateDate = dateValidator($formatedDate);
        try {
            $getAppointmentModel = new GetAppointmentModel();
            $result = $getAppointmentModel->getReservedAppointments($validateUserId['id'], $validateDate['date']);
            $appointments = array_column($result, 'time');
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Zakazani termini su uspešno dobavljeni',
                "data" => $appointments
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>