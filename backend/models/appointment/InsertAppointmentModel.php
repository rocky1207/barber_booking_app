<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
require_once (__DIR__ . '/GetAppointmentModel.php');
require_once (__DIR__ . '/../user/GetUserModel.php');
require_once (__DIR__ . '/../working_hours/GetWorkingHoursModel.php');
require_once (__DIR__ . '/../../helpers/normalizeDateDMY.php');
require_once (__DIR__ . '/../../helpers/normalizeTimeHI.php');
class InsertAppointmentModel {
    public function insertAppointment($costumer, $appointment) {
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $getUserModel = new GetUserModel();
            $user = $getUserModel->getUserById($costumer['userId']);
            if(!empty($user)) {
                $costumerQuery = "INSERT INTO costumer (userId, name, surname, phone, email) VALUES (:userId, :name, :surname, :phone, :email)";
                $stmt = DatabaseModel::$pdo->prepare($costumerQuery);
                $stmt->execute([
                    'userId' => $costumer['userId'],
                    'name' => $costumer['name'],
                    'surname' => $costumer['surname'],
                    'phone' => $costumer['phone'],
                    'email' => $costumer['email'] ?? ''
                ]);
                $costumerId = (int)DatabaseModel::$pdo->lastInsertId();
                $serviceIds = array_column($appointment, 'serviceId');
                $in = str_repeat('?,', count($serviceIds)-1) . '?';
                //$selectServicesQuery = "SELECT id FROM service WHERE id IN ($in)";
                $selectServicesQuery = "SELECT * FROM service WHERE id IN ($in)";
                $stmt = DatabaseModel::$pdo->prepare($selectServicesQuery);
                $stmt->execute($serviceIds);
                //$serviceIdsData = $stmt->fetchAll();
                $servicesData = $stmt->fetchAll();
                
                $validServiceIds = [];
                $costumerServices = [];
                $costumerServicesPrice = [];
                $i=0;
                /*
                foreach ($serviceIdsData as $id) {
                    $validServiceIds[$i] = $id['id'];
                    $i++;
                }
                    */
                foreach ($servicesData as $data) {
                    $validServiceIds[$i] = $data['id'];
                    //$costumerServices[$i] = $data['userService'];
                    //$costumerServicesPrice[$i] = $data['price'];
                    $appointment[$i]['userId'] = $costumer['userId'];
                    $appointment[$i]['userService'] = $data['userService'];
                    $appointment[$i]['price'] = $data['price'];
                    $i++;
                }
                
                $validServiceIds = array_flip($validServiceIds);
                
                $values = [];
                $params = [];
                
                foreach($appointment as $item) {
                    $serviceId = (int)$item['serviceId'];
                    $userId = (int)$item['userId'];
                    $service = $item['userService'];
                    $price = $item['price'];
                    if(!isset($validServiceIds[$serviceId])) {
                        throw new Exception("Usluga sa ID {$serviceId} ne postoji", 400);
                    }
                    
                    $dateDb = normalizeDateDMY($item['date']);
                    $timeDb = normalizeTimeHI($item['time']);
                   // $values[] = "(?, ?, ?, ?)";
                   // array_push($params, $costumerId, $serviceId, $dateDb, $timeDb);
                   $values[] = "(?, ?, ?, ?, ?, ?, ?)";
                   array_push($params, $costumerId, $serviceId, $userId, $service, $price, $dateDb, $timeDb);
                };
                
               // $insertServicesQuery = "INSERT INTO appointment (costumerId, serviceId, date, time) VALUES" . implode(',', $values);
                $insertServicesQuery = "INSERT INTO appointment (costumerId, serviceId, userId, userService, price, date, time) VALUES" . implode(',', $values);
                $insertStmt = DatabaseModel::$pdo->prepare($insertServicesQuery);
                $insertStmt->execute($params);

                
                $selectCostumerQuery = "SELECT * FROM costumer WHERE id = :id";
                $selectCostumerStmt = DatabaseModel::$pdo->prepare($selectCostumerQuery);
                $selectCostumerStmt->execute(["id" => $costumerId]);
                $costumerRow = $selectCostumerStmt->fetch();
                !$costumerRow && throw new Exception("Nije pronađen klijent sa id {$costumerId}", 400);
            } else {
                throw new Exception('Došlo je do greške prilikom izvršenja upita. Pokušajte ponovo.', 500);
            }
            $getWorkingHoursModel = new GetWorkingHoursModel();
            $workingHours = $getWorkingHoursModel->getWorkingHoursForDate($user["id"], $dateDb);
            $startTime = DateTime::createFromFormat('H:i:s', $workingHours['start_time']);
            $endTime   = DateTime::createFromFormat('H:i:s', $workingHours['end_time']);
            $interval = new DateInterval('PT30M');
            $workingHoursSlots = [];
            $current = clone $startTime;
            $endWorkingHours = $endTime->sub($interval);
            while ($current < $endWorkingHours) {
                $workingHoursSlots[] = $current->format('H:i:s');
                $current->add($interval);
            }
            $getAppointmentModel = new GetAppointmentModel();
            $appointmentTimes = $getAppointmentModel->getAppointmentTimes($userId, $dateDb);
            $reservedTerms = [];
            foreach($appointmentTimes as $appointmentTime) {
                $reservedTerms[] = $appointmentTime['time'];
            }
            
            if($reservedTerms === $workingHoursSlots) {
                $insertReservedDateQuery = 'INSERT INTO reserved_date (user_id, reserved_date) VALUES (:user_id, :reserved_date)';
                $insertReservedDateStmt = DatabaseModel::$pdo->prepare($insertReservedDateQuery);
                $insertReservedDateStmt->execute([
                    'user_id' => (int)$user['id'],
                    'reserved_date' => $dateDb
                ]);
                $reservedDateId = DatabaseModel::$pdo->lastInsertId();
            } 
            DatabaseModel::$pdo->commit();
            return [
                "date" => $appointment[0]['date'],
                "startAppointment" => $appointment[0]['time']
            ];
        } catch(Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
}
?>