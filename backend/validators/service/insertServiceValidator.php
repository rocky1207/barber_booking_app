<?php
require_once (__DIR__ . "/../../controllers/AppController.php");

function insertServiceValidator($data) {
    $inputs = [
        "service" => $data["service"],
        "price" => $data["price"],
        "userId" => $data["userId"],
    ];
    $regex = [
        "service" => AppController::SERVICE_REGEX,
        "price" => AppController::PRICE_REGEX,
        "userId" => AppController::INT_REGEX,
    ];
    $messages = [
        "service" => AppController::SERVICE_ERROR_MESSAGE,
        "price" => AppController::SERVICE_PRICE_ERROR_MESSAGE,
        "userId" => AppController::INT_ERROR_MESSAGE,
    ];
    if(isset($data["description"]) && $data["description"] !== '') {
        $inputs["description"] = $data["description"];
        $regex["description"] = AppController::DESCRIPTION_REGEX;
        $messages["description"] =  AppController::SERVICE_DESCRIPTION_ERROR_MESSAGE;
    }  
    
    $validateInputs = AppController::validateInputs($inputs, $regex, $messages, 400);
    !empty($validateInputs) && !isset($validateInputs["description"]) && $validateInputs["description"] = '';
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}
?>