<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
class GetAppointmentModel {
    public function getReservedAppointments($userId, $date) {
     $query = "
            SELECT a.time
            FROM appointment a
            JOIN service s ON a.serviceId = s.id
            WHERE s.userId = :userId
              AND a.date = :date
            ";
        /*ORDER BY a.time ASC*/
        try {
            AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                "userId" => $userId,
                "date" => $date
            ]);
            $appointments = $stmt->fetchAll();
            return $appointments;
        } catch (Exception $e) {
            throw $e;
        }
    }
};
?>