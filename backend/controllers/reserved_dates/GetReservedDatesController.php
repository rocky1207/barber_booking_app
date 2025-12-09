<?php
require_once (__DIR__ . '/../AppController.php'); 
require_once (__DIR__ . '/../../validators/integerValidator.php'); 
require_once (__DIR__ . '/../../models/reserved_dates/GetReservedDatesModel.php'); 

class GetReservedDatesController {
    public function getReservedDates($userId) {
        $validateData = integerValidator($userId);
        try {
            $getReservedDatesModel = new GetReservedDatesModel();
            $reservedDates = $getReservedDatesModel->getReservedDates($validateData['id']);
            return [
                "success" => true,
                "status" => 200,
                "message" => 'Rezervisani datumi su uspešno dobavljeni',
                "data" => $reservedDates ?? []
            ];
        } catch (Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        }
    }
}
?>