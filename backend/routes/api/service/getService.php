<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . "/../../../controllers/service/GetServiceController.php");
header('Content-Type: application/json');
$getServiceController = new GetServiceController();
$response = $getServiceController->getServices();
echo json_encode($response);
?>