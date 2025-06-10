<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
$_SERVER['REQUEST_METHOD'] !== 'POST' && AppController::createMessage("Samo POST metod je dozvoljen.", 405);
setcookie("token", "", [
  "expires" => time() - 3600,
  "path" => "/",
  "secure" => false, // true u produkciji
  "httponly" => true,
  "samesite" => "Lax"
]);
AppController::createMessage("Uspešno ste se odjavili", 200);
?>