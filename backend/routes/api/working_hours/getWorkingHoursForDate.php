<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . "/../../../controllers/working_hours/GetWorkingHoursController.php");
header('Content-Type: application/json');

$userId = $_GET['userId'] ?? null;
$date = $_GET['date'] ?? null;

if(!$userId || !$date) {
    echo json_encode([
        "success" => false,
        "status" => 400,
        "message" => "userId i date su obavezni parametri."
    ]);
    exit;
}

$getWorkingHoursController = new GetWorkingHoursController();
$response = $getWorkingHoursController->getWorkingHoursForDate($userId, $date);
echo json_encode($response);
?>



