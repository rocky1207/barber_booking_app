<?php
require_once (__DIR__ . '/../../controllers/AppController.php');
require_once (__DIR__ . '/../DatabaseModel.php');

class CleanupCostumersModel {
    /**
     * Enables MySQL event scheduler and creates a daily event that deletes
     * costumers whose appointment date was exactly yesterday. Appointments are
     * configured to cascade on costumer delete.
     */
    public function setupDailyCleanupEvent(): bool {
        try {
            AppController::databaseConnect();

            // Turn on event scheduler (global scope). This requires proper DB permissions.
            $enableSchedulerSql = "SET GLOBAL event_scheduler = ON";
            DatabaseModel::$pdo->exec($enableSchedulerSql);

            // Always refresh the event definition (drop + create) so schedule/body changes apply.
            $dropEventSql = "DROP EVENT IF EXISTS ev_cleanup_costumers_yesterday";
            DatabaseModel::$pdo->exec($dropEventSql);

            // We keep the event body as a single DELETE statement (no BEGIN...END) for PDO compatibility.
            $createEventSql = "
                CREATE EVENT ev_cleanup_costumers_yesterday
                ON SCHEDULE EVERY 1 DAY
                STARTS TIMESTAMP(CURRENT_DATE, '00:01:00')
                DO
                DELETE FROM costumer
                WHERE EXISTS (
                    SELECT 1 FROM appointment a
                    WHERE a.costumerId = costumer.id
                      AND a.date < CURDATE()
                );
            ";

           /* DELETE FROM costumer c
WHERE EXISTS (
  SELECT 1 FROM appointment a
  WHERE a.costumerId = c.id
    AND a.date < CURDATE()
    */
            DatabaseModel::$pdo->exec($createEventSql);

            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }

    /**
     * Immediately deletes costumers who have appointments dated exactly yesterday.
     * Returns number of deleted rows.
     */
    public function deleteYesterdayCostumersNow(): int {
        try {
            AppController::databaseConnect();
            $sql = "DELETE FROM costumer c
                    WHERE EXISTS (
                        SELECT 1 FROM appointment a
                        WHERE a.costumerId = c.id
                          AND a.date < CURDATE()
                    )";
            $stmt = DatabaseModel::$pdo->prepare($sql);
            $stmt->execute();
            return $stmt->rowCount();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
?>


