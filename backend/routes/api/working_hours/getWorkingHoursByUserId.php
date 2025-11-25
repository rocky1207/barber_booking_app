<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . "/../../../controllers/working_hours/GetWorkingHoursController.php");
header('Content-Type: application/json');

$userId = $_GET['userId'] ?? null;
if(!$userId) {
    echo json_encode([
        "success" => false,
        "status" => 400,
        "message" => "userId je obavezan parametar."
    ]);
    exit;
}

$getWorkingHoursController = new GetWorkingHoursController();
$response = $getWorkingHoursController->getWorkingHoursByUserId($userId);
echo json_encode($response);
?>




