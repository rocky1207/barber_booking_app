<?php
require_once (__DIR__ . "/../models/GetUserModel.php");
require_once (__DIR__ . "/../models/DatabaseModel.php");
class GetUserController {
    private $getUserModel;
    public function __construct() {
        AppController::databaseConnect();
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
        $inputs = [
            "id" => (int)$id,
        ];
        $regex = [
            "id" => AppController::INT_REGEX,
        ];
        $messages = [
            "id" => AppController::INT_ERROR_MESSAGE,
        ];
        $validateInputs = AppController::validateInputs($inputs, $regex, $messages, 422);
        if(!empty($validateInputs)) {
            try {
                $user = $this->getUserModel->getUserById($validateInputs["id"]);
                return [
                        "success" => true,
                        "status" => 200,  
                        "message" => "Korisnik uspešno dobavljen.",
                        "data" => $user
                    ];
            } catch (PDOException $e) {
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
            }
        }
    }
}
?>