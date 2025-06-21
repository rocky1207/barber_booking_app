<?php
require_once (__DIR__ ."/../../../controllers/AppController.php");
AppController::verifyRequestMethod('DELETE');
require_once (__DIR__ . '/../../../controllers/DeleteUserController.php');
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$deleteUserController = new DeleteUserController();
$response = $deleteUserController->deleteUser($data);
echo json_encode($response);
?>