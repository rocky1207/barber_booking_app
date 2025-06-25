<?php
require_once (__DIR__ . "/AppController.php");
require_once (__DIR__ . "/../models/DatabaseModel.php");
require_once (__DIR__ . "/../models/DeleteUserModel.php");
class DeleteUserController {
    public function deleteUser($data) {
        $inputs = [
            "id" => $data["id"]
        ];
        $regex = [
            "id" => AppController::INT_REGEX
        ];
        $messages = [
            "id" => 'Prosleđeni parametar mora biti broj'
        ];
        $validateInputs = AppController::validateInputs($inputs, $regex, $messages, 422);
        if(!empty($validateInputs)) {
            AppController::databaseConnect();
            try{
                $deleteUserModel = new DeleteUserModel();
                $result = $deleteUserModel->deleteUser($validateInputs["id"]);
                return $result;
            }catch(Exception $e) {
                AppController::createMessage($e->getMessage(), $e->getCode());
            }
        }
    }
}

?>