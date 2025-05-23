<?php
require_once (__DIR__ . '/AppController.php');
class LoginController {
    
    public function login() {

        $input = json_decode(file_get_contents("php://input"), true);
        $inputs = [
            "username" => $input["username"],
            "password" => $input["password"]
        ];
        $regex = [
            "username" => AppController::USERNAME_REGEX,
            "password" => AppController::PASSWORD_REGEX
        ];
        $messages = [
            "username" => AppController::WRONG_USERNAME_MESSAGE,
            "password" => AppController::WRONG_PASSWORD_MESSAGE
        ];
        $data = AppController::validateInputs($inputs, $regex, $messages);
    }
}
?>