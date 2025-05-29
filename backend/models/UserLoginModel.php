<?php
require_once (__DIR__ . "/../vendor/autoload.php");
require_once (__DIR__ . "/DatabaseModel.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

class UserLoginModel {
    private $secret_key;

    public function __construct() {
        $this->secret_key = $_ENV['JWT_SECRET'];
    }

    public function userLogin($user) {
        $query = "SELECT id, password, role FROM user WHERE username = :username";
        $stmt = DatabaseModel::$pdo->prepare($query);
        $stmt->execute([
            "username" => $user["username"],
        ]);
        $data = $stmt->fetch();

        if (!empty($data) && password_verify($user["password"], $data["password"])) {
            $payload = [
                "userId" => $data["id"],
                "role" => $data["role"],
                "iat" => time(),
                "exp" => time() + 3600 * 24 * 7
            ];

            $jwt = JWT::encode($payload, $this->secret_key, 'HS256');

            setcookie("token", $jwt, [
                "expires" => time() + 3600 * 24 * 7,
                "httponly" => true,
                "secure" => false, // promeni na true u produkciji
                "samesite" => "Strict",
                "path" => "/"
            ]);

            return [
                "success" => true,
                "message" => "Uspešna prijava"
            ];
        } else {
            return [
                "success" => false,
                "message" => "Neispravno korisničko ime ili lozinka"
            ];
        }
    }
}

?>