<?php
require_once(__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
class ResetPasswordModel {
    public function resetPassword($data) {
        ;
        $selectUserQuery = "SELECT * FROM password_resets WHERE user_id = :user_id LIMIT 1";
        $updateUsedQuery = "UPDATE password_resets SET used = :used WHERE id = :id";
        $updatePasswordQuery = "UPDATE user SET password = :password WHERE id = :id";
        $currentTime = (new DateTime())->format('Y-m-d H:i:s');
        $computedHash = hash('sha256', $data['token']);
        $newPassword = password_hash($data["newPassword"], PASSWORD_DEFAULT);
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $selectUseStmt = DatabaseModel::$pdo->prepare($selectUserQuery);
            $selectUseStmt->execute([
                'user_id' => (int)$data['userId']]);
            $user = $selectUseStmt->fetch();
            
            if(!$user) throw new Exception('Nevalidan ID.', 422);
            if($currentTime > $user['expires_at']) throw new Exception('Istekao token.', 401);
            $isHashEqual = hash_equals($computedHash, $user['token_hash']);
            if(!$isHashEqual) throw new Exception('Nevalidan token.', 422);
            $updateUsedStmt = DatabaseModel::$pdo->prepare($updateUsedQuery);
            $updateUsedStmt->execute([
                'id' => (int)$user['id'], 
                'used' => 1]);
                
          //  $updateUsedStmt->rowCount() === 0 && throw new Exception('Greška prilikom izvršenja upita.', 500);
            $updatePasswordStmt = DatabaseModel::$pdo->prepare($updatePasswordQuery);
            $updatePasswordStmt->execute([
                'id' => (int)$data['userId'], 
                'password' => $newPassword]);
            $rowCount = $updatePasswordStmt->rowCount();
            $rowCount === 0 && throw new Exception('Greška prilikom izvršenja upita.', 500);
            DatabaseModel::$pdo->commit();
            return ['success' => true];
        } catch (Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
}
?>