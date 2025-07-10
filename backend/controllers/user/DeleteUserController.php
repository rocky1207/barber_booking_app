<?php
require_once (__DIR__ . "/../AppController.php");
require_once (__DIR__ . "/../../models/DatabaseModel.php");
require_once (__DIR__ . "/../../models/user/DeleteUserModel.php");
require_once (__DIR__ . "/../../validators/deleteUserValidator.php");

class DeleteUserController {
    public function deleteUser($data) {
        
        $validateInputs = deleteUserValidator($data);
        
        try{
            $deleteUserModel = new DeleteUserModel();
            $result = $deleteUserModel->deleteUser($validateInputs["id"]);
            // return $result;
            return [
                "success" => true,
                "status" => 200, 
                "message" => "Korisnik sa ID {$validateInputs["id"]} je obrisan.",
                "data" => $result
            ];
        }catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}

?>