<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . "/../../../controllers/user/RegisterController.php");
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$registerController = new RegisterController();
$response = $registerController->register($data);
echo json_encode($response);
?>