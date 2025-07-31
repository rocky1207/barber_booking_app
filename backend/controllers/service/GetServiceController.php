<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../../validators/integerValidator.php");
require_once (__DIR__ . "/../../models/service/GetServiceModel.php");
class GetServiceController {
    public function getAllServices() {
        try {
            $getServiceModel = new GetServiceModel();
            $allServices = $getServiceModel->getAllServices();
            return [
                "success" => true,
                "status" => 200,
                "data" => $allServices
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    public function getUserServices($userId) {
        $validateData = integerValidator($userId);
        try {
            $getServiceModel = new GetServiceModel();
            $services = $getServiceModel->getUserServices($validateData["id"]);
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Usluge su uspešno dobavljene',
                "data" => $services
            ];
           // var_dump($services);
           // exit();
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    public function getServicesById($serviceId) {
        $validateData = integerValidator($serviceId);
        try {
            $getServiceModel = new GetServiceModel();
            $service = $getServiceModel->getServiceById($validateData["id"]);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Usluga uspešno dobavljena.",
                "data" => $service
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>