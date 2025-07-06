<?php
require_once (__DIR__ . "/../../../controllers/user/GetUserController.php");
AppController::verifyRequestMethod('GET');
header('Content-Type: application/json');
$getUserController = new GetUserController();
$response = $getUserController->getUsers();
echo json_encode($response);
?>