<?php
require_once (__DIR__ . "/../../validators/appointment/insertCostumerValidator.php");
class InsertAppointmentController {
    public function insertCostumer($data) {
        
        $costumer = array_diff_key($data, ['services'=> $data['services']]);
        $appointment = $data['services'];
        $validateInputs = insertServiceValidator($costumer);
        var_dump($validateInputs);
        var_dump($costumer);
        var_dump($appointment);
        exit();
    }
    
}
?>