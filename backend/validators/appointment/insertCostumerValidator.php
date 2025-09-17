<?php

require_once (__DIR__ . "/../../controllers/AppController.php");

function insertCostumerValidator($data) {
    $inputs = [
        "name" => $data["name"],
        "surname" => $data["surname"],
        "phone" => $data["phone"],
         
    ];
    $regex = [
        "name" => AppController::NAME_REGEX,
        "surname" => AppController::NAME_REGEX,
        "phone" => AppController::PHONE_REGEX,
         
    ];
    $messages = [
        "name" => AppController::NAME_ERROR_MESSAGE,
        "surname" => AppController::NAME_ERROR_MESSAGE,
        "phone" => AppController::PHONE_ERROR_MESSAGE,
        
    ];
    
    if(isset($data["email"]) && $data["email"] !== '') {
        $inputs["email"] = $data["email"];
        $regex["email"] = AppController::EMAIL_REGEX;
        $messages["email"] = AppController::EMAIL_ERROR_MESSAGE;
    }  
    
    $validateInputs = AppController::validateInputs($inputs, $regex, $messages, 400);
    //!empty($validateInputs) && !isset($validateInputs["description"]) && $validateInputs["description"] = '';
    if(!empty($validateInputs)) {
        return $validateInputs;
    } else {
        AppController::createMessage('Nema podataka za obradu.', 200);
    }
}

?>