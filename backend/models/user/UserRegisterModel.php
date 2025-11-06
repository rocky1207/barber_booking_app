<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../DatabaseModel.php");
require_once (__DIR__ . "/GetUserModel.php");
class UserRegisterModel {
    public function userRegister($data) {
        $registerQuery = "INSERT INTO user (username, password, user_email, role, file, suspended) VALUES (:username, :password, :user_email, :role, :file, :suspended)";
        $selectEmailQuery = "SELECT user_email FROM user WHERE user_email = :user_email";
        try {
            AppController::databaseConnect();
            if (!(DatabaseModel::$pdo instanceof PDO)) {
                throw new Exception("PDO konekcija nije uspostavljena.", 500);
            }
            DatabaseModel::$pdo->beginTransaction();
            $emailExistsStmt = DatabaseModel::$pdo->prepare($selectEmailQuery);
            $emailExistsStmt->execute([
                "user_email" => $data["user_email"]
            ]);
            $emailExist = $emailExistsStmt->fetchAll();
            if(!empty($emailExist)) {
                throw new Exception('Mejl koji Ste uneli već postoji. Izaberite neki drugi email', 422);
            };
            $stmt = DatabaseModel::$pdo->prepare($registerQuery);
            $stmt->execute([
                "username" => $data["username"],
                "password" => password_hash($data["password"], PASSWORD_DEFAULT),
                "user_email" => $data["user_email"],
                "role" => $data["role"],
                "file" => $data["file"],
                "suspended" => $data["suspended"],
            ]);
            if($stmt->rowCount() === 0) {
                throw new Exception("Registracija nije uspela", 404);
            }
            $lastId = DatabaseModel::$pdo->lastInsertId();
            if (!$lastId) {
                throw new Exception("Greška: ID korisnika nije dobijen nakon inserta.", 500);
            }
            DatabaseModel::$pdo->commit(); 
            
            if($lastId) {
                $id = (int)$lastId;
                $getUserModel = new GetUserModel();
                $user = $getUserModel->getUserById($id);
                if(empty($user)) {
                    throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
                }
                
                return $user;
            } else {
                throw new Exception("Greška: ID korisnika nije dobijen nakon inserta.", 500);
            }
        } catch(Exception $e) {
            if (DatabaseModel::$pdo->inTransaction()) {
                DatabaseModel::$pdo->rollBack();
            }
            throw $e;
        }
        
    }
}
?>