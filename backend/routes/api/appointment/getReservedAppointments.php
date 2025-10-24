<?php
/*
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . '/../../../controllers/appointment/GetAppointmentController.php');
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$userId = isset($_GET['userId']) && $_GET['userId'] !== null ? $_GET['userId'] : null;
$date = isset($_GET['date']) && $_GET['date'] !== null ? $_GET['date'] : null;

$getAppointmentController = new GetAppointmentController();
$response = $getAppointmentController->getReservedAppointments($userId, $date);

echo json_encode($response);
*/
?>