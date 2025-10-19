<?php
require_once (__DIR__ . "/../../validators/integerValidator.php");
require_once (__DIR__ . "/../AppController.php");
require_once (__DIR__ . "/../../models/service/DeleteServiceModel.php");
class DeleteServiceController {
    public function deleteService($data) {
        $validateInputs = integerValidator($data['id']);
        try {
            $deleteServiceModel = new DeleteServiceModel();
            $response = $deleteServiceModel->deleteService($validateInputs['id']);
            if($response) {
                return [
                "success" => true,
                "status"  => 200,
                "message" => 'Usluga je uspešno obrisana',
                "data" => $response
            ];
            } else {
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            }
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode());
        };
    }
};
?>