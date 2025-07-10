<?php
require_once (__DIR__ . "/../AppController.php");
require_once (__DIR__ . "/GetUserController.php");
require_once (__DIR__ . "/../../models/user/ChangePasswordModel.php");
require_once (__DIR__ . "/../../validators/changePasswordValidator.php");
class ChangePasswordController {
    public function changePassword($data) {
        $validateInputs = changePasswordValidator($data);
        $changePasswordModel = new ChangePasswordModel();
        try {
        $changePasswordModel->changePassword($validateInputs);
        return [
            "success" => true,
            "status" => 200,
            "data" => [
                "message" => 'Promena lozinke je uspešno izvršena.'
            ]
        ];
        } catch(Exception $e) {
        AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>