<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('DELETE');
require_once (__DIR__ . "/../../../controllers/service/DeleteServiceController.php");
$data = json_decode(file_get_contents('php://input'), true);
$deleteServiceController = new DeleteServiceController();
$response = $deleteServiceController->deleteService($data);
echo json_encode($response);
?>