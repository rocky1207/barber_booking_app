<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');

class GetEmailReminderModel {

    /**
     * Dohvata sve appointment-e koji treba da dobiju email podsetnik sutra
     */
    public function getAppointmentsForTomorrowReminder() {
        try {
            AppController::databaseConnect();
            
            $query = "
                SELECT 
                    c.id AS costumerId,
                    c.name,
                    c.surname,
                    c.email,
                    c.phone,
                    a.date,
                    a.time,
                    s.userService AS serviceName,
                    s.price AS servicePrice,
                    u.username AS barberName
                FROM appointment a
                JOIN costumer c ON a.costumerId = c.id
                JOIN service s ON a.serviceId = s.id
                JOIN user u ON s.userId = u.id
                WHERE a.date = DATE_ADD(CURDATE(), INTERVAL 1 DAY)
                  AND c.email IS NOT NULL 
                  AND c.email != ''
                ORDER BY a.time ASC, c.surname ASC, c.name ASC
            ";
            
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute();
            $appointments = $stmt->fetchAll();
            
            return $this->groupAppointmentsByCustomer($appointments);
            
        } catch (Exception $e) {
            throw $e;
        }
    }

    /**
     * Dohvata appointment-e za specifičan datum
     */
    public function getAppointmentsForDate($date) {
        try {
            AppController::databaseConnect();
            
            $query = "
                SELECT 
                    c.id AS costumerId,
                    c.name,
                    c.surname,
                    c.email,
                    c.phone,
                    a.date,
                    a.time,
                    s.userService AS serviceName,
                    s.price AS servicePrice,
                    u.username AS barberName
                FROM appointment a
                JOIN costumer c ON a.costumerId = c.id
                JOIN service s ON a.serviceId = s.id
                JOIN user u ON s.userId = u.id
                WHERE a.date = :date
                  AND c.email IS NOT NULL 
                  AND c.email != ''
                ORDER BY a.time ASC, c.surname ASC, c.name ASC
            ";
            
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(['date' => $date]);
            $appointments = $stmt->fetchAll();
            
            return $this->groupAppointmentsByCustomer($appointments);
            
        } catch (Exception $e) {
            throw $e;
        }
    }

    /**
     * Pomoćna funkcija: grupiše appointment-e po klijentu
     */
    private function groupAppointmentsByCustomer(array $appointments) {
        $groupedAppointments = [];
        foreach ($appointments as $appointment) {
            $key = $appointment['costumerId'];
            if (!isset($groupedAppointments[$key])) {
                $groupedAppointments[$key] = [
                    'costumerId' => $appointment['costumerId'],
                    'name' => $appointment['name'],
                    'surname' => $appointment['surname'],
                    'email' => $appointment['email'],
                    'phone' => $appointment['phone'],
                    'date' => $appointment['date'],
                    'barberName' => $appointment['barberName'],
                    'services' => []
                ];
            }
            $groupedAppointments[$key]['services'][] = [
                'name' => $appointment['serviceName'],
                'price' => $appointment['servicePrice'],
                'time' => $appointment['time']
            ];
        }
        return array_values($groupedAppointments);
    }
}
?>
