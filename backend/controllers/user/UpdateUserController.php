<?php
require_once (__DIR__ . "/../AppController.php");
require_once (__DIR__ . "/../../models/user/UpdateUserModel.php");
require_once (__DIR__ . "/../../validators/updateUserValidator.php");
class UpdateUserController {
    
    public function updateUser($data) {
        $validateInputs = updateUserValidator($data);
        if(!isset($validateInputs["role"])) {
            $query = "UPDATE user
            SET username = :username, file = :file
            WHERE id = :id";
            $execData = [
                "username" => $validateInputs["username"],
                "file" => $validateInputs["file"],
                "id" => (int)$validateInputs["id"]
            ];
        } else {
            $query = "UPDATE user
            SET username = :username, role = :role, file = :file
            WHERE id = :id";
            $execData = [
                "username" => $validateInputs["username"],
                "role" => $validateInputs["role"],
                "file" => $validateInputs["file"],
                "id" => (int)$validateInputs["id"]
            ];
        };
        
        try {
            $updateUserModel = new UpdateUserModel();
            $user = $updateUserModel->updateUser($query, $execData);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Uspešno ažuriranje korisnika.",
                "data" => $user
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>