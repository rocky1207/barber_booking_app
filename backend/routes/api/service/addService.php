<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . "/../../../controllers/service/AddServiceController.php");
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$addServiceController = new AddServiceController();
$response = $addServiceController->addService($data);
echo json_encode($response);
?>