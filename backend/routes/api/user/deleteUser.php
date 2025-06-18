<?php
require_once (__DIR__ . '/../../../controllers/DeleteUserController.php');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
var_dump('evo ga');
exit();
$deleteUserController = new DeleteUserController();
$response = $deleteUserController->deleteUser($data);
echo json_encode($response);
?>