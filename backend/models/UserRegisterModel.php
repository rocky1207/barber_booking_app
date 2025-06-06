<?php
require_once (__DIR__ . "/../controllers/AppController.php");
require_once (__DIR__ . "/DatabaseModel.php");
class UserRegisterModel {
    public function userRegister($data) {
        DatabaseModel::$pdo->beginTransaction();
        $query = "INSERT INTO users (username, password, role, file) VALUES (:username, :password, :role, :file)";
        try {
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                "username" => $data["username"],
                "password" => password_hash($data["password"], PASSWORD_DEFAULT),
                "role" => $data["role"],
                "file" => $data["file"]
            ]);
            if($stmt->rowCount() === 0) {
                DatabaseModel::$pdo->rollBack();
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
            }
            $lastId = DatabaseModel::$pdo->lastInsertId();
            DatabaseModel::$pdo->commit();
            return ["lastInsertId" => $lastId];
        }catch(PDOException $e) {
            throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
        }
        
    }
}
?>