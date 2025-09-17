<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
// Allow both GET and POST for easier manual testing
if($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'GET') {
    AppController::createMessage("Samo GET ili POST metod je dozvoljen.", 405);
}
require_once (__DIR__ . '/../../../controllers/appointment/CleanupCostumersController.php');
header('Content-Type: application/json');
$controller = new CleanupCostumersController();
$response = $controller->runNow();
echo json_encode($response);
?>


