<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . "/../../validators/appointment/insertCostumerValidator.php");
require_once (__DIR__ . '/../../models/appointment/InsertAppointmentModel.php');
class InsertAppointmentController {
    public function insertAppointment($data) {
        
        $costumer = array_diff_key($data, ['services'=> $data['services']]);
        $appointment = $data['services'];
        $validateInputs = insertCostumerValidator($costumer);
        $validateInputs['userId'] = $costumer['userId'];
        //$validateInputs['userId'] = 55;
        try {
            $insertAppointmentModel = new InsertAppointmentModel();
            $appointmentData = $insertAppointmentModel->insertAppointment($validateInputs, $appointment);
            return [
                "success" => true,
                "status" => 200,
                "message" => "Uspešno ste zakazali termin.",
                "data" => $appointmentData
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
        
    }
    
}
?>