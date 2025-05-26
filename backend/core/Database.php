<?php
class Database {
    private $dbHost;
    private $dbName;
    private $dbUsername;
    private $dbPassword;
    private $pdo;
    
    public function __construct($dbHost, $dbName, $dbUsername, $dbPassword) {
        $this->dbHost = $dbHost;
        $this->dbName = $dbName;
        $this->dbUsername = $dbUsername;
        $this->dbPassword = $dbPassword;
    }
    public function dbConnection() {
        try {
            $this->pdo = new PDO("mysqli:host={$this->dbHost};dbname={$this->dbName}", 
            $this->dbUsername, 
            $this->dbPassword, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, 
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            return $this->pdo;
        } catch(PDOException $e) {
            throw new Exception("Greška prilikom povezivanja sa bazom: {$e->getMessage()}");
        }
    }
}
?>