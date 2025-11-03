<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
require_once (__DIR__ . '/GetWorkingHoursModel.php');
class DeleteWorkingHoursModel {
    public function deleteWorkingHours($id) {
        $deleteQuery = 'DELETE FROM working_hours WHERE id = :id';
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $getWorkingHoursModel = new GetWorkingHoursModel();
            $working_hours_data = $getWorkingHoursModel->getWorkingHoursById($id);
            if(!empty($working_hours_data)) {
                $deleteStmt = DatabaseModel::$pdo->prepare($deleteQuery);
                $isDeleted = $deleteStmt->execute(['id' => (int)$id]);
                $deleteStmt->rowCount() === 0 && throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            } else {
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404); 
            } 
            DatabaseModel::$pdo->commit();
            return $isDeleted; 
        } catch (Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
}
?>