<?php
require_once (__DIR__ . "/../DatabaseModel.php");
class GetUserModel {
    public function getUsers() {
        $query = "SELECT id, username, role, file FROM user";
        try {
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute();
            $users = $stmt->fetchAll();
            if(empty($users)) throw new Exception(AppController::NO_RESULT_MESSAGE, 404);
            return $users;
        } catch (Exception $e) {
            throw $e;
        }
    }
    public function getUserById($id) {
        $query = "SELECT id, username, role, file FROM user WHERE id = :id";
        try {
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(["id" => $id]);
            $user = $stmt->fetch();
            if(empty($user)) throw new Exception(AppController::NO_RESULT_MESSAGE, 404);
            return $user;
        } catch (Exception $e) {
            throw $e;
        }
    }
};
?>