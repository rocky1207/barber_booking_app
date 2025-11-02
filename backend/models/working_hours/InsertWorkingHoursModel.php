<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
require_once (__DIR__ . '/GetWorkingHoursModel.php');

class InsertWorkingHoursModel {
    public function insertWorkingHours($data) {
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            
            // Check for overlapping working hours
            $this->checkForOverlaps($data['userId'], $data['start_date'], $data['end_date']);
            
            $query = "INSERT INTO working_hours (userId, start_date, end_date, start_time, end_time) VALUES (:userId, :start_date, :end_date, :start_time, :end_time)";
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                'userId' => $data['userId'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time']
            ]);
            
            if($stmt->rowCount() === 0) {
                throw new Exception("Greška prilikom unosa radnih sati.", 500);
            }
            
            $workingHoursId = (int)DatabaseModel::$pdo->lastInsertId();
            $getWorkingHoursModel = new GetWorkingHoursModel();
            $workingHours = $getWorkingHoursModel->getWorkingHoursById($workingHoursId);
            DatabaseModel::$pdo->commit();
            return $workingHours;
            /*
            return [
                "id" => $workingHoursId,
                "userId" => $data['userId'],
                "start_date" => $data['start_date'],
                "end_date" => $data['end_date'],
                "start_time" => $data['start_time'],
                "end_time" => $data['end_time']
            ];
            */
        } catch(Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
    
    private function checkForOverlaps($userId, $startDate, $endDate) {
        $query = "SELECT id, start_date, end_date FROM working_hours 
                  WHERE userId = :userId 
                  /*
                  AND (
                      (start_date <= :start_date AND end_date >= :start_date) OR
                      (start_date <= :end_date AND end_date >= :end_date) OR
                      (start_date >= :start_date AND end_date <= :end_date)
                  )
                  */
                  AND NOT (end_date < :start_date OR start_date > :end_date)
                LIMIT 1";
        
        $stmt = DatabaseModel::$pdo->prepare($query);
        $stmt->execute([
            'userId' => $userId,
            'start_date' => $startDate,
            'end_date' => $endDate
        ]);
        
        $overlaps = $stmt->fetchAll();
        if(!empty($overlaps)) {
            throw new Exception("Postojeći radni sati se preklapaju sa unetim periodom.", 400);
        }
    }
}
?>

