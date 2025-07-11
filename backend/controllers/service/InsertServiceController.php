<?php
require_once (__DIR__ . "/../../validators/service/insertServiceValidator.php");
class InsertServiceController {
    public function insertService($data) {
        $validateInputs = insertServiceValidator($data);
        var_dump($validateInputs);
        exit();
    }
}
?>