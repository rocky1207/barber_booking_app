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
            $stmt->execute($execData);
            $isUpdated = $stmt->rowCount();
            //DatabaseModel::$pdo->commit();
            if($isUpdated === 0 ) {
                throw new Exception("Korisnik ne postoji u bazi ili su uneti podaci ostali isti.", 404);
            }
            $getUserModel = new GetUserModel();
            $user = $getUserModel->getUserById($execData["id"]);
            if(empty($user)) {
                throw new Exception('Korisnik nije pronađen u bazi.', 404);
            }
            DatabaseModel::$pdo->commit();
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