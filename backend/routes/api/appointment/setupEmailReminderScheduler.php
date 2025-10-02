<?php
require_once (__DIR__ . '/../../../controllers/AppController.php');
AppController::verifyRequestMethod('POST');
require_once (__DIR__ . '/../../../controllers/appointment/EmailReminderSchedulerController.php');

header('Content-Type: application/json');

$schedulerController = new EmailReminderSchedulerController();
$response = $schedulerController->setupEmailReminderScheduler();
echo json_encode($response);
?>

