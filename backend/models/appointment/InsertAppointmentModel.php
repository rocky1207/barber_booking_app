<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
require_once (__DIR__ . '/../user/GetUserModel.php');
class InsertAppointmentModel {
    public function insertAppointment($costumer, $appointment) {
        
       try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            $getUserModel = new GetUserModel();
            $response = $getUserModel->getUserById($costumer['userId']);
           // var_dump($response);
           // exit();
            if(!empty($response)) {
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
                $serviceQuery = "SELECT id FROM service WHERE id IN ($in)";
                $stmt = DatabaseModel::$pdo->prepare($serviceQuery);
                $stmt->execute($serviceIds);
                $serviceIdsData = $stmt->fetchAll();
                $validServiceIds = [];
                $i=0;
                foreach ($serviceIdsData as $id) {
                    $validServiceIds[$i] = $id['id'];
                    $i++;
                }
                
                var_dump($validServiceIds);
                exit();
                
            } else {
                throw new Exception('Došlo je do greške prilikom izvršenja upita. Pokušajte ponovo.', 500);
            }
            DatabaseModel::$pdo->commit();
            
        } catch(Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
}
?>