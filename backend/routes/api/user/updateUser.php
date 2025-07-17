<?php
require_once (__DIR__ ."/../../../controllers/AppController.php");
AppController::verifyRequestMethod('PATCH');
require_once (__DIR__ ."/../../../controllers/user/UpdateUserController.php");
header("Content-Type: Application/json");
$data = json_decode(file_get_contents('php://input'), true);
$updateUserController = new UpdateUserController();
$response = $updateUserController->updateUser($data);
echo json_encode($response);
?>