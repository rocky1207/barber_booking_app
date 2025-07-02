<?php
require_once (__DIR__ . "/AppController.php");
require_once (__DIR__ . "/../models/UserRegisterModel.php");
class RegisterController {
    public function register($data) {
        /*
        foreach($data as $key => $value) {
            
            if($data[$key] === '') {
                
            }
        }
            */
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
            "username" => AppController::USERNAME_ERROR_MESSAGE,
            "password" => AppController::PASSWORD_ERROR_MESSAGE,
            "role" => AppController::ROLE_ERROR_MESSAGE,
            "file" => AppController::FILE_NAME_ERROR_MESSAGE
        ];

        $validateData = AppController::validateInputs($inputs, $regex, $messages, 422);
        if(!empty($validateData)) {
            AppController::databaseConnect();
            try {
                $userRegisterModel = new UserRegisterModel();
                $user = $userRegisterModel->userRegister($validateData);
                return [
                    "success" => true,
                    "status" => 200,
                    "message" => "Uspešna registracija",
                    "data" => $user
                ];
                AppController::createMessage(AppController::QUERY_ERROR_MESSAGE, 500);
            } catch(Exception $e) {
                AppController::createMessage($e->getMessage(), $e->getCode() ?: 500);
            }
        }
    }
}
?>