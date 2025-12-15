<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../DatabaseModel.php");
require_once (__DIR__ . "/GetServiceModel.php");
require_once ((__DIR__ . '/../appointment/GetAppointmentModel.php'));
class UpdateServiceModel {
    public function updateService($execData) {
         $updateServiceQuery = 'UPDATE service SET userService = :userService, price = :price WHERE id = :id';
         $selectAppQuery = 'SELECT * FROM appointment WHERE serviceId = :appServiceId';
         $updateAppointmentQuery = 'UPDATE appointment SET userService = :appService, price = :appPrice WHERE serviceId = :serviceId';
         $updateAppoiontmentData = [
            "appService" => $execData["userService"],
            "appPrice" => $execData["price"],
            "serviceId" => (int)$execData["id"]
         ];
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();

            $serviceStmt = DatabaseModel::$pdo->prepare($updateServiceQuery);
            $serviceStmt->execute($execData);
            $isServiceUpdated = $serviceStmt->rowCount();
            if($isServiceUpdated === 0) {
                throw new Exception('Uneti podaci su ostali isti ili usluga ne postoji u bazi.', 404);
            }

            $selectAppStmt = DatabaseModel::$pdo->prepare($selectAppQuery);
            $selectAppStmt->execute(['appServiceId' => (int)$execData["id"]]);
            $appointments = $selectAppStmt->fetchAll();
            
            if(!empty($appointments)) {
                $appointmentStmt = DatabaseModel::$pdo->prepare($updateAppointmentQuery);
                $appointmentStmt->execute($updateAppoiontmentData);
            }
            $getServiceModel = new GetServiceModel();
            $service = $getServiceModel->getServiceById($execData['id']);
            empty($service) && throw new Exception("Usluga sa ID {$execData['id']} ne postoji u bazi", 404);
            DatabaseModel::$pdo->commit();
            return $service;
        } catch(Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
}
?>