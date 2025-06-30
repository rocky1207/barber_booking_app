<?php
require_once (__DIR__ . "/../controllers/AppController.php");
require_once (__DIR__ . "/DatabaseModel.php");
require_once (__DIR__ ."/../controllers/GetUserController.php");
require_once (__DIR__ . "/GetUserModel.php");
class UpdateUserModel {
    public function updateUser($data) {
        $query = "UPDATE user
        SET username = :username, role = :role, file = :file
        WHERE id = :id";
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $result = $stmt->execute([
                "username" => $data["username"],
                "role" => $data["role"],
                "file" => $data["file"],
                "id" => $data["id"]
            ]);
            if(!$result) {
                DatabaseModel::$pdo->rollBack();
                throw new Exception("Ažuriranje nije uspelo", 404);
            } 
            $getUserModel = new GetUserModel();
            $user = $getUserModel->getUserById($data["id"]);
            if(empty($user)) {
                DatabaseModel::$pdo->rollBack();
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            }
            DatabaseModel::$pdo->commit();
            return $user;
        } catch(PDOException $e) {
            DatabaseModel::$pdo->rollBack();
            throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
        }
    } 
}
?>