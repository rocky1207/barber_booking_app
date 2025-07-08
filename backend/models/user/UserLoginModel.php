<?php

/*
echo password_hash('Rocky1207!', PASSWORD_DEFAULT);
$unos = 'Rocky1207!';
$hash = '$2y$10$9FyK5y4fDLldu9AqQ9RLnOV13b66v2E6B7Sb6Yg5xGSHQ6yn3JAIe';

var_dump(password_verify($unos, $hash));
exit();
*/
//require_once (__DIR__ . "/../../vendor/autoload.php");
require_once (__DIR__ . "/../../bootstrap.php");
require_once (__DIR__ . "/../DatabaseModel.php");
require_once (__DIR__ . "/../../controllers/AppController.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
//use Dotenv\Dotenv;

//$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
//$dotenv->load();
//$2y$10$9FyK5y4fDLldu9AqQ9RLnOV13b66v2E6B7Sb6Yg5xGSHQ6yn3JAIe
class UserLoginModel {
    private $secret_key;

    public function __construct() {
        $this->secret_key = $_ENV['JWT_SECRET'];
    }

    public function userLogin($user) {
        
        $query = "SELECT * FROM user WHERE username = :username";
        
        try {
            $stmt = DatabaseModel::$pdo->prepare($query);
            $stmt->execute([
            "username" => $user["username"],
        ]);
        $data = $stmt->fetch();
        if(empty($data)) throw new Exception(AppController::NO_RESULT_MESSAGE, 404);
        } catch(Exception $e) {
            throw $e;
        };
        
        //var_dump($data);
       // var_dump($user["password"]);
       // exit();

        if (!empty($data) && password_verify($user["password"], $data["password"])) {
            $payload = [
                "userId" => $data["id"],
                "role" => $data["role"],
                "iat" => time(),
                "exp" => time() + 3600 * 2
            ];

            $jwt = JWT::encode($payload, $this->secret_key, 'HS256');

            setcookie("token", $jwt, [
                "expires" => time() + 3600 * 2,
                "httponly" => true,
                "secure" => false, // promeni na true u produkciji
                "samesite" => "Lax",
                "path" => "/"
            ]);
            return [
                    "id" => $data["id"],
                    "username" => $data["username"],
                    "file" => $data["file"],
                    "role" => $data["role"],
            ];
            /*
            return [
                "success" => true,
                "status" => 200,
                "message" => "Uspešna prijava",
                "data" => [
                    "id" => $data["id"],
                    "username" => $data["username"],
                    "file" => $data["file"],
                    "role" => $data["role"],
               ]
            ];
            */
        } else {
            throw new Exception("Neispravno korisničko ime ili lozinka", 422);
            /*
            return [
                "success" => false,
                "status" => 422,
                "message" => "Neispravno korisničko ime ili lozinka"
            ];
            */
        }
            
    }
}

?>