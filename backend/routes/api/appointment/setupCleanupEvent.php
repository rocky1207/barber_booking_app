<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . '/../../../controllers/appointment/CleanupCostumersController.php');
header('Content-Type: application/json');
$controller = new CleanupCostumersController();
$response = $controller->setupEvent();
echo json_encode($response);
?>


