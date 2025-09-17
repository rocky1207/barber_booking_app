<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
function updateUserValidator($data) {
    $inputs = [
        "id" => $data["id"],
        "service" => $data["service"],
        "price" => $data["price"],
    ];
    
    $regex = [
        "id" => AppController::INT_REGEX,
        "service" => AppController::SERVICE_REGEX,
        "price" => AppController::PRICE_REGEX
    ];
    $messages = [
        "id" => AppController::INT_ERROR_MESSAGE,
        "service" => AppController::SERVICE_ERROR_MESSAGE,
        "price" => AppController::SERVICE_PRICE_ERROR_MESSAGE
    ];
    /*
    if(isset($data["description"]) && !empty($data["description"])) {
        $inputs["description"] = $data["description"];
        $regex["description"] = AppController::DESCRIPTION_REGEX;
        $messages["description"] = AppController::SERVICE_DESCRIPTION_ERROR_MESSAGE;
    }
        */
    $validateInputs = AppController::validateInputs($inputs, $regex,$messages, 422);
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>