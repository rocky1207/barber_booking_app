<?php
require_once (__DIR__ . "/../controllers/AppController.php");
function registerUserValidator($data) {
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
    $validateInputs = AppController::validateInputs($inputs, $regex,$messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>