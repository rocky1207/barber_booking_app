<?php
require_once (__DIR__ . "/../../controllers/AppController.php");
function changePasswordValidator($data) {
    $inputs = [
            "id" => $data["id"],
            "oldPassword" => $data["oldPassword"],
            "newPassword" => $data["newPassword"],
            "confirmPassword" => $data["confirmPassword"]
        ];
        $regex = [
            "id" => AppController::INT_REGEX,
            "oldPassword" => AppController::PASSWORD_REGEX,
            "newPassword" => AppController::PASSWORD_REGEX,
            "confirmPassword" => AppController::PASSWORD_REGEX
        ];
        $messages = [
            "id" => AppController::INT_ERROR_MESSAGE,
            "oldPassword" => AppController::PASSWORD_ERROR_MESSAGE,
            "newPassword" => AppController::PASSWORD_ERROR_MESSAGE,
            "confirmPassword" => AppController::PASSWORD_ERROR_MESSAGE
        ];
        $validateInputs = AppController::validateInputs($inputs, $regex,$messages, 422);
        if(!empty($validateInputs)) {
            return $validateInputs;
        } else {
            AppController::createMessage('Nema podataka za obradu.', 200);
        }
    }
?>