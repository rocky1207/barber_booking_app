<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../DatabaseModel.php");
require_once (__DIR__ . "/GetServiceModel.php");
class UpdateServiceModel {
    public function updateService($execData) {
         $query = 'UPDATE service SET userService = :userService, price = :price WHERE id = :id';
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $isUpdated = $stmt->execute($execData);
            if(!$isUpdated) {
                throw new Exception('Ažuriranje nije uspelo', 404);
            }
            $getServiceModel = new GetServiceModel();
            $service = $getServiceModel->getServiceById($execData['id']);
            empty($service) && throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            DatabaseModel::$pdo->commit();
            return $service;
        } catch(Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
}
?>