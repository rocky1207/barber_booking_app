<?php
require_once (__DIR__ . "/DatabaseModel.php");
class GetUserModel {
    public function getUsers() {
        $query = "SELECT id, username, role, file FROM user";
        try {
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute();
            $users = $stmt->fetchAll();
            return $users;
        } catch (PDOException $e) {
            throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
        }
    }
    public function getUserById($id) {
        $query = "SELECT id, username, role, file FROM user WHERE id = :id";
        try {
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(["id" => $id]);
            $users = $stmt->fetch();
            return $users;
        } catch (PDOException $e) {
            throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
        }
    }
};
?>