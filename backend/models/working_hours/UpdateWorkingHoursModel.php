<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');

class UpdateWorkingHoursModel {
    public function updateWorkingHours($id, $data) {
        try {
            AppController::databaseConnect();
            DatabaseModel::$pdo->beginTransaction();
            
            // Check if working hours exist
            $getModel = new GetWorkingHoursModel();
            $existingWorkingHours = $getModel->getWorkingHoursById($id);
            
            // Check for overlaps excluding current record
            $this->checkForOverlapsExcludingId($existingWorkingHours['userId'], $data['start_date'], $data['end_date'], $id);
            
            $query = "UPDATE working_hours 
                      SET start_date = :start_date, 
                          end_date = :end_date, 
                          start_time = :start_time, 
                          end_time = :end_time,
                          updated_at = CURRENT_TIMESTAMP
                      WHERE id = :id";
            
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
                'id' => $id,
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time']
            ]);
            
            if($stmt->rowCount() === 0) {
                throw new Exception("Greška prilikom ažuriranja radnih sati.", 500);
            }
            
            DatabaseModel::$pdo->commit();
            
            return [
                "id" => $id,
                "userId" => $existingWorkingHours['userId'],
                "start_date" => $data['start_date'],
                "end_date" => $data['end_date'],
                "start_time" => $data['start_time'],
                "end_time" => $data['end_time']
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
                  AND (
                      (start_date <= :start_date AND end_date >= :start_date) OR
                      (start_date <= :end_date AND end_date >= :end_date) OR
                      (start_date >= :start_date AND end_date <= :end_date)
                  )";
        
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

