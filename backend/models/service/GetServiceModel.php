<?php
require_once (__DIR__ . "/../DatabaseModel.php");

class GetServiceModel {
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