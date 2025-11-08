<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . "/../../../controllers/working_hours/GetWorkingHoursController.php");
header('Content-Type: application/json');
$getWorkingHoursController = new GetWorkingHoursController();
$response = $getWorkingHoursController->getAllWorkingHours();
echo json_encode($response);
?>



