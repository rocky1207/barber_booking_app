<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . "/../../models/user/UserLoginModel.php");
require_once (__DIR__ . "/../../validators/user/loginValidator.php");
class LoginController {
    
    public function login($data) {
        
        $validateData = loginValidator($data);
        try {
            $userLoginModel = new UserLoginModel();
            $user = $userLoginModel->userLogin($validateData);
            /*
            if(empty($user)) {
                AppController::createMessage("Neispravno korisničko ime ili lozinka", 422);
            }
                */
            return [
            "success" => true,
            "status" => 200,
            "message" => "Uspešna prijava",
            "data" => $user
        ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}
?>