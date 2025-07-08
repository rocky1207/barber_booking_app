<?php

require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . "/../../../controllers/user/LoginController.php");
$data = json_decode(file_get_contents('php://input'), true);
$loginController = new LoginController();
$response = $loginController->login($data);
echo json_encode($response);
?>