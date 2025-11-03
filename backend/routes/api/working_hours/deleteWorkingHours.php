<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('DELETE');
require_once (__DIR__ . "/../../../controllers/working_hours/DeleteWorkingHoursController.php");
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$deleteWorkingHoursController = new DeleteWorkingHoursController();
$response = $deleteWorkingHoursController->deleteWorkingHours($data);
echo json_encode($response);
?>


