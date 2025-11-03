<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . "/../../../controllers/working_hours/InsertWorkingHoursController.php");
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$insertWorkingHoursController = new InsertWorkingHoursController();
$response = $insertWorkingHoursController->insertWorkingHours($data);
echo json_encode($response);
?>


