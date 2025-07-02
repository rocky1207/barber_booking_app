<?php
require_once (__DIR__ . "/AppController.php");
require_once (__DIR__ . "/GetUserController.php");
require_once (__DIR__ . "/../models/ChangePasswordModel.php");
class ChangePasswordController {
    public function changePassword($data) {
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
            
           $changePasswordModel = new ChangePasswordModel();
           try {
            AppController::databaseConnect();
            $changePasswordModel->changePassword($validateInputs);
            return [
                "success" => true,
                "status" => 200,
                "data" => [
                    "message" => 'Promena lozinke je uspešno izvršena.'
                ]
            ];
           } catch(Exception $e) {
            var_dump($e->getMessage());
            AppController::createMessage($e->getMessage(), $e->getCode());
           }
           
        }
    }
}
?>