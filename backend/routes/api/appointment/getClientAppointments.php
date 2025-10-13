<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . '/../../../controllers/appointment/GetAppointmentController.php');
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$getAppointmentController = new GetAppointmentController();
$response = $getAppointmentController->getClientAppointments($data);
echo json_encode($response);
?>