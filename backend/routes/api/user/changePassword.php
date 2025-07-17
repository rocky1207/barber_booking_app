<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . "/../../../controllers/user/ChangePasswordController.php");
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$changePasswordController = new ChangePasswordController();
$response = $changePasswordController->changePassword($data);
echo json_encode($response);
?>