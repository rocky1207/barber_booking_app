<?php
require_once (__DIR__ . "/../../../controllers/GetUserController.php");
header('Content-Type: application/json');

$getUserController = new GetUserController();
$response = $getUserController->getUsers();
echo json_encode($response);
?>