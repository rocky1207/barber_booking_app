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
    file_put_contents($cleanUpFile, "Delete action: [$actionTime] $line\n", FILE_APPEND);

    global $logDir;
    
    //file_put_contents($cleanUpFile, $files, FILE_APPEND);
    /*
    foreach ($files as $file) {
    file_put_contents($cleanUpFile, "Checking: $file\n", FILE_APPEND);
    if (!is_file($file)) {
        file_put_contents($cleanUpFile, "Not a file or doesn't exist: $file\n", FILE_APPEND);
        continue;
    }
    if (!is_readable($file)) {
        file_put_contents($cleanUpFile, "Not readable: $file\n", FILE_APPEND);
        continue;
    }
    file_put_contents($cleanUpFile, "filemtime: " . filemtime($file) . "\n", FILE_APPEND);
    // ... then unlink if old enough
}
    */
/*
foreach ($files as $file) {
    $exists = file_exists($file) ? 'yes' : 'no';
    $isReadable = is_readable($file) ? 'yes' : 'no';
    $isWritable = is_writable(dirname($file)) ? 'dir writable' : 'dir not writable';
    $fileMTime = file_exists($file) ? filemtime($file) : null;
    $fileMTimeHuman = $fileMTime ? date('Y-m-d H:i:s', $fileMTime) : 'n/a';
    $expireTime = time() - (1 * 24 * 60 * 60);
    $expireTimeHuman = date('Y-m-d H:i:s', $expireTime);

    file_put_contents($cleanUpFile,
        "Checking file: $file\n".
        " - exists: $exists\n".
        " - readable: $isReadable\n".
        " - dir writable: $isWritable\n".
        " - filemtime: ".($fileMTime ?? 'null')." ($fileMTimeHuman)\n".
        " - expireTime: $expireTime ($expireTimeHuman)\n",
        FILE_APPEND
    );

    if ($fileMTime !== null && $fileMTime < $expireTime) {
        $deleted = @unlink($file);
        file_put_contents($cleanUpFile,
            " - unlink attempted: ".($deleted ? 'success' : 'failed')."\n",
            FILE_APPEND
        );
        // dodatna provera
        file_put_contents($cleanUpFile,
            " - still exists after unlink: ".(file_exists($file) ? 'yes' : 'no')."\n",
            FILE_APPEND
        );
    } else {
        file_put_contents($cleanUpFile, " - not old enough, skipping\n", FILE_APPEND);
    }
}
    */

};
$files = glob($logDir . '/email_error_log_*.log');
$now = time();
$expireTime = $now - (/*30*/1 * 24 * 60 * 60);
    
foreach($files as $file) {
    /*
    $fm = filemtime($file);
    file_put_contents($cleanUpFile,
  "now: $now (" . date('Y-m-d H:i:s', $now) . ")\n" .
  "file: $file\n" .
  "filemtime: $fm (" . date('Y-m-d H:i:s', $fm) . ")\n" .
  "expireTime: $expireTime (" . date('Y-m-d H:i:s', $expireTime) . ")\n\n",
  FILE_APPEND
);
*/
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