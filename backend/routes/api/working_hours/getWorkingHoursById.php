<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . "/../../../controllers/working_hours/GetWorkingHoursController.php");
header('Content-Type: application/json');

$id = $_GET['id'] ?? null;
if(!$id) {
    echo json_encode([
        "success" => false,
        "status" => 400,
        "message" => "id je obavezan parametar."
    ]);
    exit;
}

$getWorkingHoursController = new GetWorkingHoursController();
$response = $getWorkingHoursController->getWorkingHoursById($id);
echo json_encode($response);
?>





