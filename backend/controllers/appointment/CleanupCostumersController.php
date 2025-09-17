<?php
require_once (__DIR__ . "/../AppController.php");
require_once (__DIR__ . "/../../models/appointment/CleanupCostumersModel.php");

class CleanupCostumersController {
    public function setupEvent() {
        try {
            $model = new CleanupCostumersModel();
            $ok = $model->setupDailyCleanupEvent();
            if($ok) {
                return [
                    "success" => true,
                    "status" => 200,
                    "message" => "MySQL EVENT 'ev_cleanup_costumers_yesterday' je kreiran/aktivan.",
                    "data" => true
                ];
            } else {
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 500);
            }
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function runNow() {
        try {
            $model = new CleanupCostumersModel();
            $deleted = $model->deleteYesterdayCostumersNow();
            return [
                "success" => true,
                "status" => 200,
                "message" => "Obrisano costumer zapisa: {$deleted}.",
                "data" => ["deleted" => $deleted]
            ];
        } catch(Exception $e) {
            AppController::createMessage($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}
?>


