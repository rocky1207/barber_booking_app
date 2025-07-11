<?php
require_once (__DIR__ . "/../controllers/AppController.php");
function getUserValidator($id) {
    $inputs = [
        "id" => (int)$id,
    ];
    $regex = [
        "id" => AppController::INT_REGEX,
    ];
    $messages = [
        "id" => AppController::INT_ERROR_MESSAGE,
    ];
    $validateInputs = AppController::validateInputs($inputs, $regex,$messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>
