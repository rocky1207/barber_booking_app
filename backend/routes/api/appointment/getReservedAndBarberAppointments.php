<?php

require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . '/../../../controllers/appointment/GetAppointmentController.php');
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);


$getAppointmentController = new GetAppointmentController();
$response = $getAppointmentController->getReservedAndBarberAppointments($data);
/*
if($data["action"] === 'RESERVED_APPOINTMENTS') {
    $response = $getAppointmentController->getReservedAppointments($data['userId'], $data['date']);
} else {
    $response = $getAppointmentController->getBarberAppointments($data);
}
    */
//$userId = isset($_GET['userId']) && $_GET['userId'] !== null ? $_GET['userId'] : null;
//$date = isset($_GET['date']) && $_GET['date'] !== null ? $_GET['date'] : null;
echo json_encode($response);
?>