<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');

class GetWorkingHoursModel {
    
    public function getWorkingHoursByUserId($userId) {
        $query = "SELECT * FROM working_hours WHERE userId = :userId ORDER BY start_date ASC, start_time ASC";
        try {
            AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(['userId' => $userId]);
            $workingHours = $stmt->fetchAll();
            return $workingHours;
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    public function getWorkingHoursById($id) {
        $query = "SELECT * FROM working_hours WHERE id = :id";
        try {
            //AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(['id' => (int)$id]);
            $workingHours = $stmt->fetchAll();
            if(empty($workingHours)) {
                throw new Exception("Radni sati sa ID {$id} nisu pronađeni.", 404);
            }
            return $workingHours[0];
            //return (int)$id;
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    public function getWorkingHoursForDate($userId, $date) {
        
        $query = "SELECT * FROM working_hours 
                  WHERE userId = :userId 
                  AND :date BETWEEN start_date AND end_date
                  /*
                  AND start_date <= :date 
                  AND end_date >= :date 
                  */
                  ORDER BY start_time ASC";
        try {
            AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                'userId' => $userId,
                'date' => $date
            ]);
            $workingHours = $stmt->fetchAll();
            return $workingHours[0];
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    public function getAllWorkingHours() {
        $query = "SELECT wh.*, u.username FROM working_hours wh 
                  JOIN user u ON wh.userId = u.id 
                  ORDER BY wh.start_date ASC, wh.start_time ASC";
        try {
            AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute();
            $workingHours = $stmt->fetchAll();
            return $workingHours;
        } catch (Exception $e) {
            throw $e;
        }
    }
}
?>

