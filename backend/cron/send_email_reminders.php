<?php
chdir(__DIR__ . '/..');

// Povežemi bootstrap.php
require_once (__DIR__ . '/../bootstrap.php');

// Podešavanje log fajla
$logDir = __DIR__ . '/../tmp';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0777, true);
}
$logFile = $logDir . '/email_reminder_' . date('Y-m-d') . '.log';

function logLine(string $line) {
    global $logFile;
    $time = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$time] $line\n", FILE_APPEND);
}
// --- čišćenje starih log fajlova (starijih od 30 dana) ---
$files = glob($logDir . '/email_reminder_*.log');
$expireTime = time() - (30 * 24 * 60 * 60); // 30 dana unazad
foreach ($files as $file) {
    if (filemtime($file) < $expireTime) {
        @unlink($file);
    }
}

logLine("Cron pokrenut");

try {
    // Učitaj model i pokreni slanje
    require_once (__DIR__ . '/../models/appointment/SendEmailReminderModel.php');

    $model = new SendEmailReminderModel();
    $result = $model->sendAllTomorrowReminders();

    $sent = $result['sentCount'] ?? 0;
    $total = $result['totalCount'] ?? 0;
    $errors = $result['errors'] ?? [];

    $errStr = empty($errors) ? 'none' : implode(' | ', $errors);
    logLine("OK: Sent $sent / $total reminders. Errors: $errStr");

    echo "Done. Sent $sent / $total. Errors: " . $errStr . PHP_EOL;
    exit(0);
} catch (Throwable $e) {
    logLine("EXCEPTION: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
    file_put_contents($logFile, $e->getTraceAsString(), FILE_APPEND);
    echo "Error: " . $e->getMessage() . PHP_EOL;
    exit(1);
}
