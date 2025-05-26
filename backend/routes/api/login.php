<?php
if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Samo POST metod je dozvoljen."]);
    exit();
}

require_once (__DIR__ . "/../../controllers/LoginController.php");

$data = json_decode(file_get_contents('php//input'), true);
$loginController = new LoginController();
$response = $loginController->login($data);
echo json_encode($response);
?>