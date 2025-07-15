<?php
require_once (__DIR__ . "/../../models/user/GetUserModel.php");
require_once (__DIR__ . "/../../models/DatabaseModel.php");
require_once (__DIR__ . "/../../validators/getDataByIdValidator.php");
class GetUserController {
    private $getUserModel;
    public function __construct() {
        $this->getUserModel = new GetUserModel();
    }
    
    public function getUsers() {
        try {
            $users = $this->getUserModel->getUsers();
            if (!empty($users)) return [
                    "success" => true,
                    "status" => 200,  
                    "message" => "Korisnici su uspešno dobavljeni.",
                    "data" => $users
                ];
            AppController::createMessage(AppController::NO_RESULT_MESSAGE, 204);
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    public function getUserById($id) {
        $validateInputs = getDataByIdValidator($id);
        try {
            $user = $this->getUserModel->getUserById($validateInputs["id"]);
            return [
                    "success" => true,
                    "status" => 200,  
                    "message" => "Korisnik uspešno dobavljen.",
                    "data" => $user
                ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
        
    }
}
?>