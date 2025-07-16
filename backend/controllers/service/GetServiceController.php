<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
require_once (__DIR__ . "/../../validators/getDataByIdValidator.php");
require_once (__DIR__ . "/../../models/service/GetServiceModel.php");
class GetServiceController {
    public function getUserServices($userId) {
        $validateData = getDataByIdValidator($userId);
        try {
            $getServiceModel = new GetServiceModel();
            $services = $getServiceModel->getUserServices($validateData["id"]);
            var_dump($services);
            exit();
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    public function getServicesById($id) {
        $validateData = getDataByIdValidator($id);
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