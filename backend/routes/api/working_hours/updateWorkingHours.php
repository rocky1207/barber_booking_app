<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('PUT');
//AppController::verifyRequestMethod('PATCH');
require_once (__DIR__ . "/../../../controllers/working_hours/UpdateWorkingHoursController.php");
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$updateWorkingHoursController = new UpdateWorkingHoursController();
//$response = $updateWorkingHoursController->updateWorkingHours($data['id'], $data);
$response = $updateWorkingHoursController->updateWorkingHours($data);
echo json_encode($response);
?>





