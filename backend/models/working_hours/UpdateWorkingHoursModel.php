<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');
require_once (__DIR__ . '/GetWorkingHoursModel.php');

class UpdateWorkingHoursModel {
    public function updateWorkingHours($data) {
        
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            
            // Check if working hours exist
            $getModel = new GetWorkingHoursModel();
            //$existingWorkingHours = $getModel->getWorkingHoursById($id);
            $existingWorkingHours = $getModel->getWorkingHoursById((int)$data['id']);
            
            // Check for overlaps excluding current record
            //$this->checkForOverlapsExcludingId($existingWorkingHours['userId'], $data['start_date'], $data['end_date'], $id);
            $this->checkForOverlapsExcludingId($existingWorkingHours['userId'], $data['start_date'], $data['end_date'], $data['id']);
            $query = "UPDATE working_hours 
                      SET start_date = :start_date, 
                          end_date = :end_date, 
                          start_time = :start_time, 
                          end_time = :end_time,
                          updated_at = CURRENT_TIMESTAMP
                      WHERE id = :id";
            
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                //'id' => $id,
                'id' => (int)$data['id'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time']
            ]);
            if($stmt->rowCount() === 0) {
                throw new Exception("Unos za ovaj period nije pronađen u bazi ili su uneti podaci ostali isti.", 404);
            }
            
            DatabaseModel::$pdo->commit();
            
            return [
                //"id" => $id,
                "id" => $data['id'],
                "userId" => $existingWorkingHours['userId'],
                "start_date" => $data['start_date'],
                "end_date" => $data['end_date'],
                "start_time" => $data['start_time'],
                "end_time" => $data['end_time'],
                "created_at" => $existingWorkingHours['created_at'],
                "updated_at" => $existingWorkingHours['updated_at']
            ];
            
        } catch(Exception $e) {
            DatabaseModel::$pdo->inTransaction() && DatabaseModel::$pdo->rollBack();
            throw $e;
        }
    }
    
    private function checkForOverlapsExcludingId($userId, $startDate, $endDate, $excludeId) {
       
        $query = "SELECT id, start_date, end_date FROM working_hours 
                  WHERE userId = :userId 
                  AND id != :excludeId
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
            'end_date' => $endDate,
            'excludeId' => $excludeId
        ]);
        
        $overlaps = $stmt->fetchAll();
        
        if(!empty($overlaps)) {
            throw new Exception("Postojeći radni sati se preklapaju sa unetim periodom.", 400);
        }
    }
}
?>

