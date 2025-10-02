<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . '/../../../controllers/appointment/EmailReminderController.php');

header('Content-Type: application/json');

$emailReminderController = new EmailReminderController();
$response = $emailReminderController->sendTomorrowReminders();
echo json_encode($response);
?>

