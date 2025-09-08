<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . '/../../../controllers/appointment/GetAppointmentController.php');
header('Content-Type: application/json');
$date = isset($_GET['date']) && $_GET['date'] !== null ? $_GET['date'] : null;
$getAppointmentController = new GetAppointmentController();
$response = $getAppointmentController->getReservedAppointments($date);
echo json_encode($response);
?>