<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
require_once (__DIR__ . '/../appointment/GetAppointmentModel.php');
class DeleteClientAppointmentModel {
    public function deleteClientAppointment($id) {
        $query = "DELETE FROM appointment WHERE id = :id";
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $getAppointmentModel = new GetAppointmentModel();
            $appointment = $getAppointmentModel->getAppointment($id);
            $costumerId = $appointment[0]['costumerId'];
            if(!empty($appointment)) {
                $stmt = DatabaseModel::$pdo->prepare($query);
                $stmt->execute(['id' => $id]);
                $stmt->rowCount() === 0 && throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
                $countAppointmentQuery = 'SELECT COUNT(*) FROM appointment WHERE costumerId = :costumerId';
                $stmt = DatabaseModel::$pdo->prepare($countAppointmentQuery);
                $stmt->execute(['costumerId' => $costumerId]);
                $count = $stmt->fetchColumn();
                if((int)$count === 0) {
                    $deleteQuery = "DELETE FROM costumer WHERE id = :costumerId";
                    $deleteStmt = DatabaseModel::$pdo->prepare($deleteQuery);
                    $deleteStmt->execute(['costumerId' => $costumerId]);
                }
                DatabaseModel::$pdo->commit();
                return $id;
            } else {
                throw new Exception(AppController::QUERY_ERROR_MESSAGE, 404);
            }
        } catch (Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
}
?>