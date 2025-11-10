<?php
require_once (__DIR__ . '/../controllers/AppController.php');
function emailValidator($data) {
    $inputs = ["email" => $data["email"]];
    $regex = ["email" => AppController::EMAIL_REGEX];
    $messages = ["email" => AppController::EMAIL_ERROR_MESSAGE];
    $validateInputs = AppController::validateInputs($inputs, $regex, $messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu', 200);
    }
};
?>