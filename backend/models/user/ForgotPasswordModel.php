<?php
require_once (__DIR__  . '/../../controllers/AppController.php');
require_once (__DIR__  . '/../DatabaseModel.php');
class ForgotPasswordModel {
    public function forgotPassword($data) {
        $selectQuery = 'SELECT user_email FROM user WHERE user_email = :user_email';
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $selectEmailStmt = DatabaseModel::$pdo->prepare($selectQuery);
            $selectEmailStmt->execute(["user_email" => $data["email"]]);
            $response = $selectEmailStmt->fetchAll();
            if(!empty($response)) {
                $token = bin2hex(random_bytes(32));
                $hashToken = hash('sha256', $token);
            } else {
                throw new Exception('Ukoliko postoji korisnik sa unetim emailom, primićete email sa uputstvom.', 422);
            }
            DatabaseModel::$pdo->commit();
            return $response[0];
        } catch (Exception $e) {
            throw $e;
        }
    }
}
?>