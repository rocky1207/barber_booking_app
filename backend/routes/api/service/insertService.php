<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . "/../../../controllers/service/InsertServiceController.php");
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
var_dump($data);
        exit();
$addServiceController = new InsertServiceController();
$response = $addServiceController->insertService($data);
echo json_encode($response);
?>