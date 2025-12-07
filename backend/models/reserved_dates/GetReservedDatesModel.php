<?php
require_once (__DIR__ . '/../../controllers/AppController.php'); 
require_once (__DIR__ . '/../DatabaseModel.php'); 
class GetReservedDatesModel {
    public function getReservedDates($userId) {
        $query = 'SELECT * FROM reserved_dates WHERE user_id = :user_id';
        try {
            AppController::databaseConnect();
            $insertReservedDateStmt = DatabaseModel::$pdo->prepare($query);
            $insertReservedDateStmt->execute(['user_id' => (int)$userId]);
            $reservedDates = $insertReservedDateStmt->fetchAll();
            return $reservedDates;
        } catch (Exception $e) {
            throw $e;
        }
    }
}
?>