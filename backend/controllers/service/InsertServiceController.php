<?php
require_once (__DIR__ . "/../../validators/service/insertServiceValidator.php");
require_once (__DIR__ . "/../../models/service/InsertServiceModel.php"); 
class InsertServiceController {
    public function insertService($data) {
        $validateInputs = insertServiceValidator($data);
        try {
            $insertServiceModel = new InsertServiceModel();
            $result = $insertServiceModel->insertService($data);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Usluge su uspešno dobavljene.",
                "data" => [
                    "lastInsertedId" => $result
                ]
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>