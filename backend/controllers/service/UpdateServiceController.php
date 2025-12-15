<?php
require_once (__DIR__ . "/../AppController.php");
require_once (__DIR__ . "/../../validators/service/updateServiceValidator.php");
require_once (__DIR__ . "/../../models/service/UpdateServiceModel.php");
class UpdateServiceController {
    public function updateService($data) {
        $validateInputs = updateUserValidator($data);
       
        $execData = [
            "userService" => $validateInputs["service"],
            "price" => $validateInputs["price"],
            "id" => $validateInputs["id"]
        ];
        
        /*
        if(!isset($validateInputs['description'])) {
            $execData["description"] = '';
        } else {
             $execData["description"] = $validateInputs["description"];
        }
        */
        try {
            $updateServiceModel = new UpdateServiceModel();
            $service = $updateServiceModel->updateService($execData);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Uspešno ažuriranje usluge.",
                "data" => $service
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>