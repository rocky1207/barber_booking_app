<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../DatabaseModel.php");
require_once (__DIR__ . "/GetUserModel.php");
require_once (__DIR__ . "/../service/DeleteServiceModel.php");
class DeleteUserModel {
    public function deleteUser($id) {
        $query = "DELETE FROM user WHERE id = :id";
        
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $getUserModel = new GetUserModel();
            $user = $getUserModel->getUserById($id);
            if(!empty($user)) {
                $deleteServiceModel = new DeleteServiceModel();
                $areAllServicesDeleted = $deleteServiceModel->deleteAllUserServices($id);
                !$areAllServicesDeleted &&  throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
                $stmt = DatabaseModel::$pdo->prepare($query);
                $stmt->execute(["id" => $id]);
                if($stmt->rowCount() === 0) {
                    throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
                }
                if($user["file"]) {
                    AppController::deleteUserImage($user["file"]);
                }
            } else {
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            }
            
            DatabaseModel::$pdo->commit();
            return true;
        } catch(Exception $e) {
            if(DatabaseModel::$pdo->inTransaction()) DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
}
?>