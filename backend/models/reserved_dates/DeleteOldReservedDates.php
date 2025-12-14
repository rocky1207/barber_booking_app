<?php
require_once (__DIR__ . '/../DatabaseModel.php');
require_once (__DIR__ . '/../../controllers/AppController.php');
class DeleteOldReservedDates {
    public const INTERVAL = 1;
   
    public function deleteOldReservedDates() {
        $query = 'DELETE from reserved_dates WHERE created_at < (NOW() - INTERVAL :days DAY)';
        AppController::databaseConnect();
        $stmt = DatabaseModel::$pdo->prepare($query);
        $stmt->execute(['days' => self::INTERVAL]);
        $deletedOldeReservedDates = $stmt->rowCount();
        return [
            'success' => true,
            'deletedOldReservedDates' => $deletedOldeReservedDates
        ];
    }
}
?>