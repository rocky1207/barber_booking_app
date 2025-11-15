<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../DatabaseModel.php");
require_once (__DIR__ . "/GetServiceModel.php");
class DeleteServiceModel {
    public function deleteService($id) {
        $query = 'DELETE FROM service WHERE id = :id';
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $getServiceModel = new GetServiceModel();
            $service = $getServiceModel->getServiceById($id);
            if(!empty($service)) {
                $stmt = DatabaseModel::$pdo->prepare($query);
                $isDeleted = $stmt->execute(["id" => $id]);
                $stmt->rowCount() === 0 && throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
                DatabaseModel::$pdo->commit();
               // return $isDeleted;
               return $id;
            } else {
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            }
        } catch(Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
    /*
    public function deleteAllUserServices($userId) {
        $query = 'DELETE FROM service WHERE userId = :userId';
        try {
            $stmt = DatabaseModel::$pdo->prepare($query);
            $isDeleted = $stmt->execute(["userId" => $userId]);
            !$isDeleted && throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            return $isDeleted;
        } catch(Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
        */
}
?>