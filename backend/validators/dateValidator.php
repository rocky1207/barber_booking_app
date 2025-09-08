<?php
require_once (__DIR__ . "/../controllers/AppController.php");
function dateValidator($date) {
    $inputs = [
        "date" => $date,
    ];
    $regex = [
        "date" => AppController::DATE_REGEX,
    ];
    $messages = [
        "date" => AppController::DATE_ERROR_MESSAGE,
    ];
    $validateInputs = AppController::validateInputs($inputs, $regex, $messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>
