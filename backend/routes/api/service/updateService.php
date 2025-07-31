<?php
require_once(__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('PATCH');
require_once (__DIR__ . "/../../../controllers/service/UpdateServiceController.php");
$data = json_decode(file_get_contents('php://input'), true);
$updateServiceController = new UpdateServiceController();
$response = $updateServiceController->updateService($data);
echo json_encode($response);
?>