<?php
require_once (__DIR__ . '/../DatabaseModel.php');
require_once (__DIR__ . '/../../controllers/AppController.php');
class DeleteOldErrorLogsModel {
    private const INTERVAL = 1/*30*/;
    public function deleteOldErrorLogs() {
        
        $deleteEmailErrorLogQuery = "DELETE FROM email_error_log WHERE 
        created_at < (NOW() - INTERVAL :days DAY)";
        $deletePasswordResetRequestsQuery = "DELETE FROM password_reset_requests WHERE 
        created_at < (NOW() - INTERVAL :days DAY)";
        $deletePasswordResetsQuery = "DELETE FROM password_resets WHERE 
        created_at < (NOW() - INTERVAL :days DAY)";
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
            
            return [
                'success' => true,
                'deletedEmailLog' => $deletedErrorLogs ,
                'deletedResetReq' => $deleteddResetRequest,
                'deletedPasswordResets' => $deletedPasswordResets,
                //'fileRotated' => $fileRotated
            ];
        } catch (Throwable $e) {
            throw $e;
        }
    }
}
?>