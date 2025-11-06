<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . '/../../validators/emailValidator.php');
require_once (__DIR__ . '/../../models/user/ForgotPasswordModel.php');
class ForgotPasswordController {
    public function forgotPassword($data) {
        $validateInputs = emailValidator($data);
        try {
            $forgotPasswordModel = new ForgotPasswordModel();
            $response = $forgotPasswordModel->forgotPassword($validateInputs);
            return [
                "success" => true,
                "status" => 200,
                "data" => $response,
                "message" => 'Ukoliko postoji korisnik sa unetim emailom, primićete email sa uputstvom.'
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>