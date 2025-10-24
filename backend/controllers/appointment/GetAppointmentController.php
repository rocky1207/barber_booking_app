<?php
require_once (__DIR__ . '/../AppController.php');
require_once (__DIR__ . '/../../helpers/normalizeDateDMY.php');
require_once (__DIR__ . '/../../validators/dateValidator.php');
require_once (__DIR__ . '/../../validators/integerValidator.php');
require_once (__DIR__ . '/../../validators/appointment/insertCostumerValidator.php');
require_once (__DIR__ . '/../../models/appointment/GetAppointmentModel.php');
class GetAppointmentController {
    public function getReservedAndBarberAppointments($data) {
        $formatedDate = normalizeDateDMY($data['date']);
        $validateUserId = integerValidator((int)$data['userId']);
        $validateDate = dateValidator($formatedDate);
        if($data['action'] === 'RESERVED_APPOINTMENTS' || $data['action'] === 'BARBER_APPOINTMENTS') {
            $data = ['action' => $data['action'], 'userId' => $validateUserId['id'], 'date' => $validateDate['date']];
        } else {
            AppController::createMessage('Nepoznata akcija', 422);
        }
        
        try {
            $getAppointmentModel = new GetAppointmentModel();
            $result = $getAppointmentModel->getReservedAndBarberAppointments($data);
            if($data['action'] === 'RESERVED_APPOINTMENTS') {
               // $data = ['action' => $data['action'], 'userId' => $validateUserId['id'], 'date' => $validateDate['date']];
                //$result = $getAppointmentModel->getReservedAppointments($validateUserId['id'], $validateDate['date']);
                //$result = $getAppointmentModel->getUniversal($data);
                // Extract just the time values for backward compatibility
                $appointmentTimes = array_column($result, 'time');
                $result = $appointmentTimes;
                /*
                return [
                    "success" => true,
                    "status" => 200,
                    "message" => 'Zakazani termini su uspešno dobavljeni',
                    "data" => $appointmentTimes,
                    "detailedData" => $result // Include full appointment details for future use
                ];
                */
          //  } else {
               // $data = ['action' => $data['action'], 'userId' => $validateUserId['id'], 'date' => $validateDate['date']];
                //$data = ['userId' => $validateUserId['id'], 'date' => $validateDate['date']];
                //$result = $getAppointmentModel->getBarberAppointments($data);
               // $result = $getAppointmentModel->getUniversal($data);
            
            // Extract just the time values for backward compatibility
            //$appointmentTimes = array_column($result, 'time');
            /*
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Zakazani termini su uspešno dobavljeni',
                "data" => $result // $appointmentTimes,
               // "detailedData" => $result // Include full appointment details for future use
            ];
            */
            }
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Zakazani termini su uspešno dobavljeni',
                "data" => $result // $appointmentTimes,
               // "detailedData" => $result // Include full appointment details for future use
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    /*
    public function getReservedAppointments($userId, $date) {
        $formatedDate = normalizeDateDMY($date);
        $validateUserId = integerValidator((int)$userId);
        $validateDate = dateValidator($formatedDate);
        try {
            $getAppointmentModel = new GetAppointmentModel();
            $result = $getAppointmentModel->getReservedAppointments($validateUserId['id'], $validateDate['date']);
            
            // Extract just the time values for backward compatibility
            $appointmentTimes = array_column($result, 'time');
            
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Zakazani termini su uspešno dobavljeni',
                "data" => $appointmentTimes,
                "detailedData" => $result // Include full appointment details for future use
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
    public function getBarberAppointments($data) {
        
        $formatedDate = normalizeDateDMY($data['date']);
        $validateUserId = integerValidator((int)$data['userId']);
        $validateDate = dateValidator($formatedDate);
        
        $data = ['userId' => $validateUserId['id'], 'date' => $validateDate['date']];
        try {
            $getAppointmentModel = new GetAppointmentModel();
            $result = $getAppointmentModel->getBarberAppointments($data);
            
            // Extract just the time values for backward compatibility
            //$appointmentTimes = array_column($result, 'time');
            
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Zakazani termini su uspešno dobavljeni',
                "data" => $result // $appointmentTimes,
               // "detailedData" => $result // Include full appointment details for future use
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
*/
    public function getClientAppointments($data) {
        $validateInputs = insertCostumerValidator($data);
        try {
            $getAppointmentModel = new GetAppointmentModel();
            $response = $getAppointmentModel->getClientAppointments($validateInputs);
            if(!$response) {
               throw new Exception('Ne postoje zakazani termini za podatke koje ste uneli.', 422);
            }
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Zakazani termini su uspešno dobavljeni',
                "data" => $response
                
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>