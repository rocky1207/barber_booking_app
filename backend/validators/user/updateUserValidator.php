<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
function updateUserValidator($data) {
    $inputs = [
        "id" => (int)$data["id"],
        "username" => $data["username"],
        "file" => $data["file"],
        "suspended" => $data["suspended"]
    ];
    $regex = [
        "id" => AppController::INT_REGEX,
        "username" => AppController::USERNAME_REGEX,
        "file" => AppController::FILE_REGEX,
        "suspended" => AppController::TRUE_OR_FALSE_REGEX
    ];
    $messages = [
        "id" => AppController::INT_ERROR_MESSAGE,
        "username" => AppController::USERNAME_ERROR_MESSAGE,
        "file" => AppController::FILE_NAME_ERROR_MESSAGE,
        "suspended" => AppController::SELECT_FIELD_ERROR_MESSAGE
    ];
    if(isset($data["role"])) {
        $inputs["role"] = $data["role"];
        $regex["role"] = AppController::ROLE_REGEX;
        $messages["role"] = AppController::ROLE_ERROR_MESSAGE;
    }
    $validateInputs = AppController::validateInputs($inputs, $regex,$messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>