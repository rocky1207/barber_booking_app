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

    public function getClientAppointments($data) {
        $query = "
        SELECT
            a.date,
            a.time,
            s.userService AS serviceName,
            s.price AS servicePrice,
            s.id AS serviceId,
            a.id AS appointmentId,
            c.id AS costumerId,
            c.name,
            c.surname,
            c.phone
        FROM appointment a
        JOIN costumer c ON a.costumerId = c.id
        JOIN service s ON a.serviceId = s.id
        WHERE LOWER(c.name) = LOWER(:name)
            AND LOWER(c.surname) = LOWER(:surname)
            AND c.phone = :phone
        ORDER BY a.date ASC, a.time ASC
    ";
    try {
        AppController::databaseConnect();
        $stmt = DatabaseModel::$pdo->prepare($query);
        $stmt->execute([
            'name' => $data['name'],
            'surname' => $data['surname'],
            'phone' => $data['phone']
        ]);
        $rows = $stmt->fetchAll();
        return $rows;
    } catch (Exception $e) {
        throw $e;
    }
        
    }
};
?>