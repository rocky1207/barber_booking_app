<?php
require_once (__DIR__ ."/../../controllers/AppController.php");
require_once (__DIR__ . "/../DatabaseModel.php");
class GetUserModel {
    
    public function getUsers() {
        $query = "SELECT id, username, role, file, user_email, suspended FROM user";
        try {
            AppController::databaseConnect();
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
        $query = "SELECT id, username, role, file, user_email, suspended FROM user WHERE id = :id";
        try {
           // AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(["id" => $id]);
            $user = $stmt->fetch();
            if(!$user) throw new Exception("Korisnik sa ID {$id} nije pronađen.", 404);
            return $user;
        } catch (Exception $e) {
            throw $e;
        }
    }
};
?>