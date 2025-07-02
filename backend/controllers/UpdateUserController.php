<?php
require_once (__DIR__ . "/AppController.php");
require_once (__DIR__ . "/../models/UpdateUserModel.php");
class UpdateUserController {
    
    public function updateUser($data) {
        
        $inputs = [
            "id" => (int)$data["id"],
            "username" => $data["username"],
            "role" => $data["role"],
            "file" => $data["file"]
        ];
        $regex = [
            "id" => AppController::INT_REGEX,
            "username" => AppController::USERNAME_REGEX,
            "role" => AppController::ROLE_REGEX,
            "file" => AppController::FILE_REGEX
        ];
        $messages = [
            "id" => AppController::INT_ERROR_MESSAGE,
            "username" => AppController::USERNAME_ERROR_MESSAGE,
            "role" => AppController::ROLE_ERROR_MESSAGE,
            "file" => AppController::FILE_NAME_ERROR_MESSAGE
        ];
        $validateInputs = AppController::validateInputs($inputs, $regex, $messages, 422);
        if(!empty($validateInputs)) {
            AppController::databaseConnect();
            try {
                $updateUserModel = new UpdateUserModel();
                $user = $updateUserModel->updateUser($validateInputs);
                return [
                    "success" => true,
                    "status" => 200,
                    "message" => "Uspešno ažuriranje korisnika.",
                    "data" => $user
            ];
            } catch(Exception $e) {
                AppController::createMessage($e->getMessage(), $e->getCode());
            }
        }
    }
}
?>