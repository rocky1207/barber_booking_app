<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . "/../../../controllers/service/GetServiceController.php");
header('Content-Type: application/json');
$userId = isset($_GET["id"]) && $_GET["id"] !== null ? (int)$_GET["id"] : null;
$getServiceController = new GetServiceController();
$response = $getServiceController->getUserServices($userId);
echo json_encode($response);
?>