<?php
class UpdateUserController {
    public function updateUser($data) {
        $inputs = [
            "id" => $data["id"]
        ];
        $regex = [
            "id" => AppController::INT_REGEX
        ];
        $messages = [
            "id" => 'Prosleđeni parametar mora biti broj'
        ];
    }
}
?>