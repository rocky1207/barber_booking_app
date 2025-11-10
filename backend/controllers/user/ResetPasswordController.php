<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . '/../../validators/passwordValidator.php');
require_once (__DIR__ . '/../../models/user/ResetPasswordModel.php');
class ResetPasswordController {
    public function resetPassword($data) {
    $validateData = passwordValidator($data['newPassword']);
    $data['newPassword'] = $validateData['password'];
    try {
        $resetPasswordModel = new ResetPasswordModel();
        $response = $resetPasswordModel->resetPassword($data);
        return [
            'success' => true,
            'message' => 'Lozinka je uspešno resetovana.',
            'data' => $response
        ];
    } catch (Exception $e) {
        AppController::createMessage($e->getMessage(), $e->getCode());
    }
        
    }
}
?>