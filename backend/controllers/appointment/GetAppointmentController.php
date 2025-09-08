<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . '/../../helpers/normalizeDateDMY.php');
require_once (__DIR__ . '/../../validators/dateValidator.php');
require_once (__DIR__ . '/../../models/appointment/GetAppointmentModel.php');
class GetAppointmentController {
    public function getReservedAppointments($date) {
        $date = normalizeDateDMY($date);
        $validateInputs = dateValidator($date);
        try {
            $getAppointmentModel = new GetAppointmentModel();
        $getAppointmentModel->getReservedAppointments($validateInputs['date']);
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
        
    }
}
?>