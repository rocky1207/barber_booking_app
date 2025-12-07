<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
class GetAppointmentModel {
    public function getAppointmentTimes($userId, $date) {
        
        $query = "SELECT time FROM appointment WHERE userId = :userId AND date = :date";
        try {
            //AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                'userId' => (int)$userId,
                'date' => $date
            ]);
            $times = $stmt->fetchAll();
           // if(empty($times)) throw new Exception("Nema rezultata", 404);
           
            return $times;
        } catch (Exception $e) {
            throw $e;
        }
    }
    public function getAppointment($id) {
        $query = "SELECT * FROM appointment WHERE id = :id";
        try {
            //AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(['id' => $id]);
            $appointment = $stmt->fetchAll();
            if(empty($appointment)) throw new Exception("Nije pronađen nijedan termin sa ID {$id}", 404);
            return $appointment;
        } catch (Exception $e) {
            throw $e;
        }
    }
    public function getReservedAndBarberAppointments($data) { 
        if($data['action'] === 'GET_RESERVED_APPOINTMENTS') {
           /* $query = "
            SELECT a.time
            FROM appointment a
            JOIN service s ON a.serviceId = s.id
            WHERE s.userId = :userId
              AND a.date = :date
            ";*/
            $query = "
            SELECT a.time
            FROM appointment a
            JOIN user u ON a.userId = u.id
            WHERE u.id = :userId
            AND a.date = :date
            ";
            
        } else if ($data['action'] === 'GET_BARBER_APPOINTMENTS') {
          /*  $query = "
            SELECT 
                a.id AS appointmentId,
                a.time,
                a.date,
                s.userService,
                s.price,
                c.name,
                c.surname,
                c.phone
            FROM appointment a
            JOIN service s ON a.serviceId = s.id
            JOIN costumer c ON a.costumerId = c.id
            WHERE s.userId = :userId
              AND a.date = :date
            ORDER BY a.time
            ";*/
            $query = "
            SELECT 
                a.id AS appointmentId,
                a.time,
                a.date,
                a.userService,
                a.price,
                c.name,
                c.surname,
                c.phone
                FROM appointment a
                JOIN user u ON a.userId = u.id
                JOIN costumer c ON a.costumerId = c.id
                WHERE u.id = :userId
                AND a.date = :date
                ORDER BY a.time
                ";
        };
         try {
            AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                "userId" => $data['userId'],
                "date" => $data['date']
            ]);
            $appointments = $stmt->fetchAll();
            return $appointments;
        } catch (Exception $e) {
            throw $e;
        }
    }
    /*
    public function getReservedAppointments($userId, $date) {
    $query = "
            SELECT a.time
            FROM appointment a
            JOIN service s ON a.serviceId = s.id
            WHERE s.userId = :userId
              AND a.date = :date
            ";
        (ORDER BY a.time ASC)
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
    */
    /*
    public function getBarberAppointments($data) {
        
    $query = "
            SELECT 
                a.id AS appointmentId,
                a.time,
                a.date,
                s.userService,
                s.price,
                c.name,
                c.surname,
                c.phone
            FROM appointment a
            JOIN service s ON a.serviceId = s.id
            JOIN costumer c ON a.costumerId = c.id
            WHERE s.userId = :userId
              AND a.date = :date
            ORDER BY a.time
            ";
        ORDER BY a.time ASC
        try {
            AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                "userId" => $data['userId'],
                "date" => $data['date']
            ]);
            $appointments = $stmt->fetchAll();
            return $appointments;
        } catch (Exception $e) {
            throw $e;
        }
    }
*/
    public function getClientAppointments($data) {
        /*
        $query = "
        SELECT
            a.date,
            a.time,
            s.userService AS serviceName,
            s.price AS servicePrice,
            s.id AS serviceId,
            a.id AS appointmentId,
            c.id AS costumerId,
            u.id AS userId,
            c.name,
            c.surname,
            c.phone,
            u.username AS barber
        FROM appointment a
        JOIN costumer c ON a.costumerId = c.id
        LEFT JOIN service s ON a.serviceId = s.id
        JOIN user u ON c.userId = u.id
        WHERE LOWER(c.name) = LOWER(:name)
            AND LOWER(c.surname) = LOWER(:surname)
            AND c.phone = :phone
        ORDER BY a.date ASC, a.time ASC
    ";
    */
    $query = "
        SELECT
            a.date,
            a.time,
            a.userService AS serviceName,
            a.price AS servicePrice,
            a.serviceId,
            a.id AS appointmentId,
            c.id AS costumerId,
            u.id AS userId,
            c.name,
            c.surname,
            c.phone,
            u.username AS barber
        FROM appointment a
        JOIN costumer c ON a.costumerId = c.id
        JOIN user u ON c.userId = u.id
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