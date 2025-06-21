<?php
require_once (__DIR__ . "/../controllers/AppController.php");
require_once (__DIR__ . "/DatabaseModel.php");
class DeleteUserModel {
    public function deleteUser($id) {
        $query = "DELETE FROM user WHERE id = :id";
        DatabaseModel::$pdo->beginTransaction();
        try {
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(["id" => $id]);
            if($stmt->rowCount() === 0) {
                DatabaseModel::$pdo->rollBack();
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            }
            DatabaseModel::$pdo->commit();
            return [
                "success" => true, 
                "message" => "Korisnik sa ID {$id} je obrisan."
            ];
        } catch(PDOException $e) {
            DatabaseModel::$pdo->rollBack();
            throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
        }
    }
}
?>