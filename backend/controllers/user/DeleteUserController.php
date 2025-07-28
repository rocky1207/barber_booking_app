<?php
require_once (__DIR__ . "/../AppController.php");
require_once (__DIR__ . "/../../models/user/DeleteUserModel.php");
require_once (__DIR__ . "/../../validators/integerValidator.php");

class DeleteUserController {
    public function deleteUser($data) {
        $validateInputs = integerValidator($data['id']);
        try{
            $deleteUserModel = new DeleteUserModel();
            $isDeleted = $deleteUserModel->deleteUser($validateInputs["id"]);
            if($isDeleted ) {
                return [
                "success" => true,
                "status" => 200, 
                "message" => "Korisnik sa ID {$validateInputs["id"]} je obrisan.",
                "data" => $isDeleted 
            ];
            } else {
                throw throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            }
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>