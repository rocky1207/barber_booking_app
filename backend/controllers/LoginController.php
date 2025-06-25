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
        $validateData = AppController::validateInputs($inputs, $regex, $messages, 422);
        
        if(!empty($validateData)) {
            AppController::databaseConnect();
            try {
                $userLoginModel = new UserLoginModel();
                $user = $userLoginModel->userLogin($validateData);
                //var_dump($bla);
                $user["success"] ? false : AppController::createMessage($user["message"], $user["status"]);
                return $user["data"];
            } catch(Exception $e) {
                AppController::createMessage($e->getMessage(), $e->getCode() ?: 500);
            }
        }
        
    }
}
?>