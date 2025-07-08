<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../DatabaseModel.php");
class ChangePasswordModel {
    public function changePassword($data) {
        
        $query = "SELECT password FROM user WHERE id = :id";
        AppController::databaseConnect();
        try {
            DatabaseModel::$pdo->beginTransaction();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                "id" => $data["id"],
            ]);
        $password = $stmt->fetch();
        if(!empty($password) && password_verify($data["oldPassword"], $password["password"])) {
            $result = AppController::comparePasswords($data["newPassword"], $data["confirmPassword"]);
            if($result) {
                $newQuery = "UPDATE user SET password = :newPassword WHERE id = :id";
                $stmt = DatabaseModel::$pdo->prepare($newQuery);
                $newPassword = password_hash($data["newPassword"], PASSWORD_DEFAULT);
                
                $isChanged = $stmt->execute([
                    "id" => $data["id"],
                    "newPassword" => $newPassword
                ]);
                if(!$isChanged || $stmt->rowCount() === 0) {
                    DatabaseModel::$pdo->rollBack();
                     throw new Exception("Lozinka nije promenjena.Uneli ste možda istu lozinku kao staru ili je greška u parametrima upita.", 400);
                }
                DatabaseModel::$pdo->commit();
                return $isChanged;
            }
        } else {
            DatabaseModel::$pdo->rollBack();
            throw new Exception('Unos važeće lozinke nije ispravan.', 422);
        }
        } catch (Exception $e) {
            if (DatabaseModel::$pdo->inTransaction()) {
                DatabaseModel::$pdo->rollBack();
            }
            throw $e;
        }
    }
}
?>