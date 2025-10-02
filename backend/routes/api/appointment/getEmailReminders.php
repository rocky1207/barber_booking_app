<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('GET');
require_once (__DIR__ . '/../../../controllers/appointment/EmailReminderController.php');

header('Content-Type: application/json');

$emailReminderController = new EmailReminderController();
$response = $emailReminderController->getTomorrowReminders();
echo json_encode($response);
?>

