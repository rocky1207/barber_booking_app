<?php
require_once (__DIR__ . "/../AppController.php");
require_once (__DIR__ . "/../../models/user/UpdateUserModel.php");
require_once (__DIR__ . "/../../validators/user/updateUserValidator.php");
class UpdateUserController {
    
    public function updateUser($data) {
        $validateInputs = updateUserValidator($data);
        if(!isset($validateInputs["role"])) {
            $query = "UPDATE user
            SET full_name = :full_name, username = :username, file = :file, suspended = :suspended
            WHERE id = :id";
            $execData = [
                "full_name" => $validateInputs["full_name"],
                "username" => $validateInputs["username"],
                "file" => $validateInputs["file"],
                "suspended" => (int)$validateInputs["suspended"],
                "id" => (int)$validateInputs["id"]
            ];
        } else {
            $query = "UPDATE user
            SET full_name = :full_name, username = :username, role = :role, file = :file, suspended = :suspended
            WHERE id = :id";
            $execData = [
                "full_name" => $validateInputs["full_name"],
                "username" => $validateInputs["username"],
                "role" => $validateInputs["role"],
                "file" => $validateInputs["file"],
                "suspended" => (int)$validateInputs["suspended"],
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