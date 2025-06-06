<?php
require_once (__DIR__ . "/AppController.php");
require_once (__DIR__ . "/../models/UserRegisterModel.php");
class RegisterController {
    public function register($data) {
        $inputs = [
            "username" => $data["username"],
            "password" => $data["password"],
            "role" => $data["role"],
            "file" => $data["file"]
        ];
        $regex = [
            "username" => AppController::USERNAME_REGEX,
            "password" => AppController::PASSWORD_REGEX,
            "role" => AppController::ROLE_REGEX,
            "file" => AppController::FILE_REGEX,
        ];
        $messages = [
            "username" => AppController::WRONG_USERNAME_MESSAGE,
            "password" => AppController::WRONG_PASSWORD_MESSAGE,
            "role" => AppController::ROLE_ERROR_MESSAGE,
            "file" => AppController::FILE_ERROR_MESSAAGE
        ];

        $validateData = AppController::validateInputs($inputs, $regex, $messages, 422);
        if(!empty($validateData)) {
            AppController::databaseConnect();
            try {
                $userRegisterModel = new UserRegisterModel();
                $userId = $userRegisterModel->userRegister($validateData);
                return $userId;
            } catch(Exception $e) {
                AppController::createMessage($e->getMessage(), $e->getCode() ?: 500);
            }
        }
    }
}
?>