<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
function loginValidator($data) {
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
    $validateInputs = AppController::validateInputs($inputs, $regex,$messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>