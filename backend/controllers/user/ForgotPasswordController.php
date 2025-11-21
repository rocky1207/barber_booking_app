<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . '/../../validators/emailValidator.php');
require_once (__DIR__ . '/../../models/user/ForgotPasswordModel.php');
require_once (__DIR__ . '/../../validators/emailValidator.php');
class ForgotPasswordController {
    public function forgotPassword($data) {
        // Proveri email format pre validacije da bismo mogli da logujemo grešku
        $email = $data['email'] ?? '';
        $email = trim($email);
        
        // Ako email format nije validan, loguj grešku pre nego što validator pozove createMessage (koji exit-uje)
        if (empty($email) || !preg_match(AppController::EMAIL_REGEX, $email)) {
            $forgotPasswordModel = new ForgotPasswordModel();
            $errorMsg = AppController::EMAIL_ERROR_MESSAGE;
            $forgotPasswordModel->logEmailError('error', $errorMsg, 'forgot_password_validation', null, $email);
        }
        
        // Validacija email formata (createMessage će exit-ovati ako nije validan)
        $validateInputs = emailValidator($data);
        
        try {
            $forgotPasswordModel = new ForgotPasswordModel();
        $response = $forgotPasswordModel->forgotPassword($validateInputs/*$validateEmail*/);
            if(!$response['success']) {
                throw new Exception($response['message'], $response['status']);
            }
            return [
                "success" => true,
                "status" => 200,
                "data" => $response['user'],
                "message" => 'Ukoliko postoji korisnik sa unetim emailom, primićete email sa uputstvom.'
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>