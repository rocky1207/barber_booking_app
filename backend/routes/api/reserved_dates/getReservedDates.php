<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . "/../../../controllers/reserved_dates/GetReservedDatesController.php");
header('Content-Type: application/json');

$userId = isset($_GET["userId"]) && $_GET["userId"] !== null ? (int)$_GET["userId"] : null;

$getReservedDatesController = new GetReservedDatesController();
$response = $getReservedDatesController->getReservedDates($userId);
echo json_encode($response);
?>