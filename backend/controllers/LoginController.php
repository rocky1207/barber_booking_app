<?php
require_once (__DIR__ . '/AppController.php');
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
        return $response;
    }
}
?>