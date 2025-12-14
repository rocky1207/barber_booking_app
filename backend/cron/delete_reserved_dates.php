<?php
require_once (__DIR__ . '/../bootstrap.php');
require_once (__DIR__ . '/../models/reserved_dates/DeleteOldReservedDates.php');

$tmpDir = (__DIR__  . '/../tmp');
$logDir = $tmpDir . '/delete_reserved_dates_log';
$fileCreationDate = (new DateTime())->format('Y-m-d');
$actionTime = (new DateTime())->format('Y-m-d H:i:s');
if(!is_dir($logDir)) {
    mkdir($logDir, 0777, true);
} 

$cleanUpFile = $logDir . '/cleanup_last_run.txt';
$logFile = $logDir . '/delete_reserved_dates_' . $fileCreationDate . '.php';
function logLine($line) {
    global $logFile;
    global $actionTime;
    file_put_contents($logFile, "Delete action: [$actionTime] - $line\n", FILE_APPEND);
}
//logLine('Radi '. $actionTime);
$logs = glob($logDir . '/delete_reserved_dates_*.php');
$now = time();
$expireTime = $now - (1 * 24 * 60 * 60);
foreach($logs as $log) {
    if(filemtime($log) < $expireTime) {
        unlink($log);
    } 
}
file_put_contents($cleanUpFile, "Last cleanup run: {$actionTime}");
try {
    $deleteOldReservedDates = new DeleteOldReservedDates();
    $rowNumbers = $deleteOldReservedDates->deleteOldReservedDates();
    logLine("Obrisano je {$rowNumbers["deletedOldReservedDates"]} redova");
} catch(Throwable $e) {
    logLine("Error time: [{$actionTime}];\n Delete error: {$e->getMessage()}");
    return ['success' => false, 'error' => $e->getMessage()];
}
// Za CLI izlaz
$rowNumbers["actionTime"] = $actionTime;
echo json_encode($rowNumbers, JSON_UNESCAPED_UNICODE) . PHP_EOL;
?>