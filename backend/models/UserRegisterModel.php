<?php
require_once (__DIR__ . "/../controllers/AppController.php");
require_once (__DIR__ . "/DatabaseModel.php");
require_once (__DIR__ . "/GetUserModel.php");
class UserRegisterModel {
    public function userRegister($data) {
        DatabaseModel::$pdo->beginTransaction();
        $query = "INSERT INTO user (username, password, role, file) VALUES (:username, :password, :role, :file)";
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
                throw new Exception("Registracija nije uspela", 404);
            }
            $lastId = DatabaseModel::$pdo->lastInsertId();
            if($lastId) {
                $id = (int)$lastId;
                $getUserModel = new GetUserModel();
                $user = $getUserModel->getUserById($id);
                if(empty($user)) {
                    DatabaseModel::$pdo->rollBack();
                    throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
                }
                DatabaseModel::$pdo->commit(); 
                return $user;
            }
            DatabaseModel::$pdo->commit();
           // return ["lastInsertId" => $lastId];
        } catch(PDOException $e) {
            DatabaseModel::$pdo->rollBack();
            throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
        }
        
    }
}
?>