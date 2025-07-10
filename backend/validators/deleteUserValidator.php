<?php
require_once (__DIR__ . "/../controllers/AppController.php");
function deleteUserValidator($data) {
    $inputs = [
            "id" => $data["id"]
    ];
    $regex = [
        "id" => AppController::INT_REGEX
    ];
    $messages = [
        "id" => 'Prosleđeni parametar mora biti broj'
    ];
    $validateInputs = AppController::validateInputs($inputs, $regex, $messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
        } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>