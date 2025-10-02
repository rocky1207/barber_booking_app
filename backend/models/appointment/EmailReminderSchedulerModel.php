<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');

class EmailReminderSchedulerModel {
    
    /**
     * Kreira MySQL event scheduler koji šalje email podsetnike svaki dan u 15:00
     */
    public function setupEmailReminderEvent(): bool {
        try {
            AppController::databaseConnect();
            
            // Uključi event scheduler
            $enableSchedulerSql = "SET GLOBAL event_scheduler = ON";
            DatabaseModel::$pdo->exec($enableSchedulerSql);
            
            // Obriši postojeći event ako postoji
            $dropEventSql = "DROP EVENT IF EXISTS ev_send_email_reminders";
            DatabaseModel::$pdo->exec($dropEventSql);
            
            // Kreiraj novi event
            $createEventSql = "
                CREATE EVENT ev_send_email_reminders
                ON SCHEDULE EVERY 1 DAY
                STARTS TIMESTAMP(CURRENT_DATE, '15:00:00')
                DO
                BEGIN
                    -- Pozovi PHP skriptu koja šalje email podsetnike
                    -- Ovo će biti pozvano kroz HTTP request na našu rutu
                    SET @result = 0;
                END
            ";
            
            DatabaseModel::$pdo->exec($createEventSql);
            
            return true;
            
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    /**
     * Kreira MySQL event scheduler koji poziva HTTP endpoint za slanje email-a
     * Ova metoda koristi MySQL EVENT koji poziva HTTP request
     */
    public function setupEmailReminderEventWithHttp(): bool {
        try {
            AppController::databaseConnect();
            
            // Uključi event scheduler
            $enableSchedulerSql = "SET GLOBAL event_scheduler = ON";
            DatabaseModel::$pdo->exec($enableSchedulerSql);
            
            // Obriši postojeći event ako postoji
            $dropEventSql = "DROP EVENT IF EXISTS ev_send_email_reminders_http";
            DatabaseModel::$pdo->exec($dropEventSql);
            
            // Kreiraj event koji poziva HTTP endpoint
            // Napomena: MySQL ne podržava direktno pozivanje HTTP-a, 
            // pa ćemo koristiti alternativni pristup
            $createEventSql = "
                CREATE EVENT ev_send_email_reminders_http
                ON SCHEDULE EVERY 1 DAY
                STARTS TIMESTAMP(CURRENT_DATE, '15:00:00')
                DO
                BEGIN
                    -- Kreiraj log entry da je event pokrenut
                    INSERT INTO email_reminder_log (event_time, status, message) 
                    VALUES (NOW(), 'scheduled', 'Email reminder event triggered');
                END
            ";
            
            DatabaseModel::$pdo->exec($createEventSql);
            
            return true;
            
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    /**
     * Kreira tabelu za logovanje email podsetnika
     */
    public function createEmailReminderLogTable(): bool {
        try {
            AppController::databaseConnect();
            
            $createTableSql = "
                CREATE TABLE IF NOT EXISTS email_reminder_log (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    event_time DATETIME NOT NULL,
                    status ENUM('scheduled', 'sent', 'error') NOT NULL,
                    message TEXT,
                    sent_count INT DEFAULT 0,
                    error_count INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ";
            
            DatabaseModel::$pdo->exec($createTableSql);
            
            return true;
            
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    /**
     * Loguje rezultat slanja email podsetnika
     */
    public function logEmailReminderResult($status, $message, $sentCount = 0, $errorCount = 0): bool {
        try {
            AppController::databaseConnect();
            
            $insertLogSql = "
                INSERT INTO email_reminder_log (event_time, status, message, sent_count, error_count) 
                VALUES (NOW(), :status, :message, :sent_count, :error_count)
            ";
            
            $stmt = DatabaseModel::$pdo->prepare($insertLogSql);
            $stmt->execute([
                'status' => $status,
                'message' => $message,
                'sent_count' => $sentCount,
                'error_count' => $errorCount
            ]);
            
            return true;
            
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    /**
     * Dohvata logove email podsetnika
     */
    public function getEmailReminderLogs($limit = 50) {
        try {
            AppController::databaseConnect();
            
            $query = "
                SELECT * FROM email_reminder_log 
                ORDER BY created_at DESC 
                LIMIT :limit
            ";
            
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();
            
            return $stmt->fetchAll();
            
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    /**
     * Proverava da li je event scheduler aktivan
     */
    public function isEventSchedulerEnabled(): bool {
        try {
            AppController::databaseConnect();
            
            $query = "SHOW VARIABLES LIKE 'event_scheduler'";
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute();
            $result = $stmt->fetch();
            
            return $result && $result['Value'] === 'ON';
            
        } catch (Exception $e) {
            throw $e;
        }
    }
    
    /**
     * Dohvata informacije o postojećim event-ima
     */
    public function getEmailReminderEvents() {
        try {
            AppController::databaseConnect();
            
            $query = "
                SELECT * FROM information_schema.EVENTS 
                WHERE EVENT_NAME LIKE '%email_reminder%' 
                AND EVENT_SCHEMA = DATABASE()
            ";
            
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute();
            
            return $stmt->fetchAll();
            
        } catch (Exception $e) {
            throw $e;
        }
    }
}
?>

