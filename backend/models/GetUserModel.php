<?php
require_once (__DIR__ . "/DatabaseModel.php");
class GetUserModel {
    public function getUsers() {
        $query = "SELECT * FROM user";

        try {
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute();
            $users = $stmt->fetchAll();
            return $users;
        } catch (PDOException $e) {
            throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
        }
    }
};
?>