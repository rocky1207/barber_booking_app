<?php
require_once (__DIR__ . "/DatabaseModel.php");
class UserLoginModel {
    public function userLogin($data) {
        $query = "SELECT COUNT(*) as user_exists FROM user WHERE username = :username AND password = :password";
        $stmt = DatabaseModel::$pdo->prepare($query);
        $stmt->execute([
            "username" => $data["username"],
            "password" => $data["password"]
        ]);
        $res = $stmt->fetchAll();
        if(!empty($res) && $res[0]["user_exists"] > 0) {
            return [
                "success" => true,
                "message" => "Uspešna prijava"
            ];
        } else {
            return [
                "success"=>false,
                "message"=>"Nema takvog korisnika"
            ];
        }
       // return $res;
        
    }
} 
?>