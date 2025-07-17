<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . "/../../../controllers/user/GetUserController.php");
header('Content-Type: application/json');
$getUserController = new GetUserController();
$response = $getUserController->getUsers();
echo json_encode($response);
?>