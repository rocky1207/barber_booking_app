<?php
require_once (__DIR__ . "/../DatabaseModel.php");

class GetServiceModel {
    public function getUserServices($userId) {
        $query = "SELECT * FROM service WHERE userId = :userId";
        try {
            AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(["userId" => $userId]);
            $services = $stmt->fetchAll();
            if(empty($services)) throw new Exception("Usluge korisnika sa ID {$userId} nisu pronađene.", 404);
            return $services;
        } catch(Exception $e) {
            throw $e;
        }
    }
    public function getServiceById($id) {
        $query = "SELECT * FROM service WHERE id = :id";
        try {
            // AppController::databaseConnect();
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute(["id" => $id]);
            $service = $stmt->fetch();
            if(!$service) throw new Exception("Usluga sa ID {$id} nije pronađena.", 404);
            return $service;
        } catch(Exception $e) {
            throw $e;
        }
    }
}
?>