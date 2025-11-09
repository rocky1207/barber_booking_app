<?php
require_once (__DIR__ . '/../DatabaseModel.php');
require_once (__DIR__ . '/../../controllers/AppController.php');
class DeleteOldErrorLogsModel {
    private const INTERVAL = 1;
    public function deleteOldErrorLogs() {
        $deleteEmailErrorLogQuery = "DELETE FROM email_error_log WHERE 
        created_at < ((NOW) - INTERVAL :days DAY)";
        $deletePasswordResetRequestsQuery = "DELETE FROM password_reset_requests WHERE 
        created_at < ((NOW) - INTERVAL :days DAY)";
        $deletePasswordResetsQuery = "DELETE FROM password_resets WHERE 
        created_at < ((NOW) - INTERVAL :days DAY)";
        try {
            AppController::databaseConnect();
            $deleteEmailErrorLogStmt = DatabaseModel::$pdo->prepare($deleteEmailErrorLogQuery);
            $deleteEmailErrorLogStmt->execute(['days' => self::INTERVAL]);
            $deletedErrorLogs = $deleteEmailErrorLogStmt->rowCount();

            $deletePasswordResetRequestStmt = DatabaseModel::$pdo->prepare($deletePasswordResetRequestsQuery);
            $deletePasswordResetRequestStmt->execute(['days' => self::INTERVAL]);
            $deleteddResetRequest = $deletePasswordResetRequestStmt->rowCount();

            $deletePasswordResetsStmt = DatabaseModel::$pdo->prepare($deletePasswordResetsQuery);
            $deletePasswordResetsStmt->execute(['days' => self::INTERVAL]);
            $deletedPasswordResets = $deletePasswordResetRequestStmt->rowCount();

            $fileDir = '/../../tmp/reset_password_email_error_log';
            $filePath = $fileDir . '/email_error_log.log';
            $fileRotated = false;

            if(!is_dir($fileDir)) {
                @mkdir($fileDir, 0777, true);
            }
            if(is_file($filePath)) {
                $renameFileTime = (new DateTime())->format('Ymd_His');
                $archiveName = '/email_error_log_'.$renameFileTime.'.log';
                if(@rename($filePath, $archiveName)) {
                    $fileRotated = true;
                } else {
                    if(@unlink($filePath)) $fileRotated = true;
                }
                @file_put_contents($filePath, "");
            }

            return [
                'success' => true,
                'deletedEmailLog' => $deletedErrorLogs ,
                'deletedResetReq' => $deleteddResetRequest,
                'deletedPasswordResets' => $deletedPasswordResets,
                'fileRotated' => $fileRotated
            ];
        } catch (Throwable $e) {
            $fallback = __DIR__.'/../../tmp/delete_error_log';
            $errorTime = (new DateTime())->format('Y-m-d H:i:s');
            @file_put_contents($fallback, '['.$errorTime.'] '.'Cleanup error: '.$e->getMessage().PHP_EOL, FILE_APPEND);
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}
?>