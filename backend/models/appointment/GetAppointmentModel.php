<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
class GetAppointmentModel {
    public function getReservedAppointments($date) {
        var_dump($date);
        exit();
        try {
            AppController::databaseConnect();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
?>