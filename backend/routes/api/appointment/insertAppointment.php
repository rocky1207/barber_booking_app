<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . '/../../../controllers/appointment/InsertAppointmentController.php');
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$insertAppointmentController = new InsertAppointmentController();
$insertAppointmentController->insertAppointment($data);

?>