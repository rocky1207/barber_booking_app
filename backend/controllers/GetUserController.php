<?php
require_once (__DIR__ . "/../models/GetUserModel.php");
require_once (__DIR__ . "/../models/DatabaseModel.php");
class GetUserController {
    public function getUsers() {
        $getUserModel = new GetUserModel();

        DatabaseModel::connect();
        try {
            $users = $getUserModel->getUsers();
            if (!empty($users)) return $users;
            AppController::createMessage(AppController::NO_RESULT_MESSAGE, 204);
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>