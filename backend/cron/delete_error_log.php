<?php
chdir(__DIR__ . '/..'); //pozicioniraj se u backend folder ako treba
require_once (__DIR__ . '/../bootstrap.php');
require_once (__DIR__ . '/../models/user/DeleteOldErrorLogsModel.php');

$tmpDir = __DIR__ . '/../tmp';
$logDir = $tmpDir . '/reset_password_log';
//$emailErrorLog = $logDir . '/email_error_log.log';
//$resetPasswordSuccess = $fileDir . '/reset_password';
$fileCreationDate = (new DateTime())->format('Y-m-d');
$actionTime = (new DateTime())->format('Y-m-d H:i:s');
if(!is_dir($logDir)) {
    mkdir($logDir, 0777, true);
}
$cleanUpFile = $logDir . '/cleanup_last_run.txt';

$emailErrorLogFile = $logDir . '/email_error_log_' . $fileCreationDate . '.log';


function logLine($line) {
    global $actionTime;
    global $cleanUpFile;
    file_put_contents($cleanUpFile, "Delete action: [$actionTime] $line\n");
    

};
$files = glob($logDir . '/email_error_log_*.log');
$now = time();
$expireTime = $now - (/*30*/1 * 24 * 60 * 60);
    
foreach($files as $file) {
    if(filemtime($file) < $expireTime) {
        unlink($file);
    }
}

try {
    $model = new DeleteOldErrorLogsModel();
    $result = $model->deleteOldErrorLogs();
    $deletedEmailErrorLogs = $result['deletedEmailLog'];
    $deletedResetPasswordRequests = $result['deletedResetReq'];
    $deletedPasswordResets = $result['deletedPasswordResets'];
    $successLine = "
        [deletedEmailErrorLogs] - $deletedEmailErrorLogs
        [deletedResetRequests] - $deletedResetPasswordRequests
        [deletedPasswordResets] - $deletedPasswordResets";
    logLine($successLine);
} catch(Throwable $e) {
   // $fallback = __DIR__.'/../tmp/reset_password_log/delete_error_log_'.$fileCreationDate.'.log';
    $fallback = __DIR__.'/../tmp/reset_password_log/email_error_log_'.$fileCreationDate.'.log';
    $errorTime = (new DateTime())->format('Y-m-d H:i:s');
    @file_put_contents($fallback, '['.$actionTime.'] '.'Cleanup error: '.$e->getMessage().PHP_EOL, FILE_APPEND);
    return ['success' => false, 'error' => $e->getMessage()];
}

// Za CLI izlaz
echo json_encode($result, JSON_UNESCAPED_UNICODE) . PHP_EOL;
?>