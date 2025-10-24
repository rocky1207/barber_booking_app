<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('DELETE');
require_once (__DIR__ . '/../../../controllers/appointment/DeleteClientAppointmentController.php');
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$deleteClientAppointmentController = new DeleteClientAppointmentController();
$response = $deleteClientAppointmentController->deleteClientAppointment($data['id']);
echo json_encode($response);
?>