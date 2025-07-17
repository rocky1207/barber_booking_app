<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../DatabaseModel.php");
require_once (__DIR__ . "/../../controllers/service/GetServiceController.php");
class InsertServiceModel {
    public function insertService($data) {
        $query = "INSERT INTO service (userId, userService, price, description) VALUES (:userId, :userService, :price, :description)";
        try {
            AppController::databaseConnect();
            if (!(DatabaseModel::$pdo instanceof PDO)) {
                throw new Exception("PDO konekcija nije uspostavljena.", 500);
            }
            DatabaseModel::$pdo->beginTransaction();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                "userId" => $data["userId"],
                "userService" => $data["service"],
                "price" => $data["price"],
                "description" => $data["description"],
            ]);
            $stmt->rowCount() === 0 && throw new Exception("Unos usluge nije uspeo", 404);
            $lastInsertId = DatabaseModel::$pdo->lastInsertId();
            !$lastInsertId && throw new Exception("Greška: ID korisnika nije dobijen nakon inserta.", 500);
            // kod za dobavljanje usluge prema ID
            $id = (int)$lastInsertId;
            $getServiceController = new GetServiceController();
            $service = $getServiceController->getServicesById($id);
            DatabaseModel::$pdo->commit();
            return $service;
        } catch (Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
}
?>