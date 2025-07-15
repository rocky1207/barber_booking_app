<?php
require_once (__DIR__ . "/../../validators/service/insertServiceValidator.php");
require_once (__DIR__ . "/../../models/service/InsertServiceModel.php"); 
class InsertServiceController {
    public function insertService($data) {
        $validateInputs = insertServiceValidator($data);
        try {
            $insertServiceModel = new InsertServiceModel();
            $result = $insertServiceModel->insertService($validateInputs);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Usluga je uspešno unešena u bazu.",
                "data" => $result
                
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>