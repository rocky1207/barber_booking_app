<?php
require_once (__DIR__ . '/AppController.php');
require_once (__DIR__ . "/../models/UserLoginModel.php");
class LoginController {
    
    public function login($data) {

        $inputs = [
            "username" => $data["username"],
            "password" => $data["password"]
        ];
        $regex = [
            "username" => AppController::USERNAME_REGEX,
            "password" => AppController::PASSWORD_REGEX
        ];
        $messages = [
            "username" => AppController::WRONG_USERNAME_MESSAGE,
            "password" => AppController::WRONG_PASSWORD_MESSAGE
        ];
        $response = AppController::validateInputs($inputs, $regex, $messages, 401);
        
        if(!empty($response)) {
            try {
                AppController::databaseConnect();
                /*ovde će ići kod koji šalje upit ka bazi*/
                $userLoginModel = new UserLoginModel();
                $bla = $userLoginModel->userLogin($response);
                //var_dump($bla);
                return $bla;
            } catch(Exception $e) {
                AppController::createMessage($e->getMessage(), $e->getCode() ?: 500);
            }
        }
        
    }
}
?>