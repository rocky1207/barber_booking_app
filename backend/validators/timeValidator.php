<?php
require_once (__DIR__ . "/../controllers/AppController.php");
function timeValidator($time) {
    $inputs = [
        "time" => $time,
    ];
    $regex = [
        "time" => AppController::TIME_REGEX,
    ];
    $messages = [
        "time" => AppController::TIME_ERROR_MESSAGE,
    ];
    $validateInputs = AppController::validateInputs($inputs, $regex, $messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>
