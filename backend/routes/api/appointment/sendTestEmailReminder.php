<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . '/../../../controllers/appointment/EmailReminderController.php');

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['costumerId'])) {
    AppController::createMessage('ID klijenta je obavezan.', 400);
}

$emailReminderController = new EmailReminderController();
$response = $emailReminderController->sendTestReminder($data['costumerId']);
echo json_encode($response);
?>

