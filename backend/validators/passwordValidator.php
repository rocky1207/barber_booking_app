<?php
require_once (__DIR__ . "/../controllers/AppController.php");
function passwordValidator($password) {
    $inputs = ["password" => $password];
    $regex = ["password" => AppController::PASSWORD_REGEX];
    $messages = ["password" => AppController::PASSWORD_ERROR_MESSAGE];
    $validateInputs = AppController::validateInputs($inputs, $regex,$messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>