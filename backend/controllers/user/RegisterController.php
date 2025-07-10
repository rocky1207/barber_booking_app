<?php
require_once (__DIR__ . "/../AppController.php");
require_once (__DIR__ . "/../../models/user/UserRegisterModel.php");
require_once (__DIR__ . "/../../validators/registerUserValidator.php");
class RegisterController {
    public function register($data) {
        $validateData = registerUserValidator($data);
        try {
            $userRegisterModel = new UserRegisterModel();
            $user = $userRegisterModel->userRegister($validateData);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Uspešna registracija",
                "data" => $user
            ];
          //  AppController::createMessage(AppController::QUERY_ERROR_MESSAGE, 500);
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode() ?: 500);
        }
    } 
 }
?>