<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../DatabaseModel.php");
require_once (__DIR__ ."/../../controllers/user/GetUserController.php");
require_once (__DIR__ . "/GetUserModel.php");
class UpdateUserModel {
    public function updateUser($query, $execData) {
        
        try {
            AppController::databaseConnect();
            if (!(DatabaseModel::$pdo instanceof PDO)) {
                throw new Exception("PDO konekcija nije uspostavljena.", 500);
            }
            DatabaseModel::$pdo->beginTransaction();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $result = $stmt->execute($execData);
            DatabaseModel::$pdo->commit();
            if(!$result) {
                throw new Exception("Ažuriranje nije uspelo", 404);
            } 
            $getUserModel = new GetUserModel();
            $user = $getUserModel->getUserById($execData["id"]);
            if(empty($user)) {
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            }
            return $user;
        } catch(Exception $e) {
             if (isset(DatabaseModel::$pdo) && DatabaseModel::$pdo->inTransaction()) {
                DatabaseModel::$pdo->rollBack();
            }
            throw $e;
        }
    } 
}
?>