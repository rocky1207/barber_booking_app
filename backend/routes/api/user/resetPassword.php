<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('PATCH');
require_once (__DIR__ . '/../../../controllers/user/ResetPasswordController.php');
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$resetPasswordController = new ResetPasswordController();
$response = $resetPasswordController->resetPassword($data);
echo json_encode($response);
?>