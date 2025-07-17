<?php
require_once (__DIR__ . "/../bootstrap.php");
//require_once (__DIR__ . "/../vendor/autoload.php");


use Firebase\JWT\JWT;
use Firebase\JWT\Key;
//use Dotenv\Dotenv;

//$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
//$dotenv->load();


function authenticateUser() {
    if(!isset($_COOKIE["token"])) return null;
    $jwt = $_COOKIE["token"];

    try {
        $decoded = JWT::decode($jwt, new Key($_ENV["JWT_SECRET"], "HS256"));
        return (array) $decoded;
    } catch (Exception $e) {
        //AppController::createMessage("Invalid token", 401);
        return false;
    }
}
?>