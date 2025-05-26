<?php
require_once (__DIR__ . '/../core/Database.php');
class DatabaseModel {
    public static PDO $pdo;

    const DB_HOST = "localhost";
    const DB_NAME = "barber_booking_app";
    const DB_USERNAME = "root";
    const DB_PASSWORD = "";

    public function connect() {
        try {
            $db = new Database(self::DB_HOST, self::DB_NAME, self::DB_USERNAME, self::DB_PASSWORD);
            self::$pdo = $db->dbConnection();
        } catch(Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
?>