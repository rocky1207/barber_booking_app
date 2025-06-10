<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    AppController::createMessage("Samo POST metod je dozvoljen.", 405);
    exit();
};


require_once (__DIR__ . "/../../../controllers/RegisterController.php");

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$registerController = new RegisterController();
$response = $registerController->register($data);
echo json_encode($response);
?>