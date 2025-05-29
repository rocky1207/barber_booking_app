<?php
require_once (__DIR__ . "/../../../helpers/auth.php");
require_once (__DIR__ . "/../../../controllers/AppController.php");

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    AppController::createMessage("Samo GET metoda je dozvoljena.", 405);
    exit();
}

$user = authenticateUser();

if (!$user) {
    AppController::createMessage("Neautorizovan pristup. Prijavite se.", 401);
    exit();
}

// Možeš ovde i dodatno proveriti u bazi ako ti treba

echo json_encode([
    "status" => 200,
    "message" => "Korisnik je logovan",
    "data" => [
        "userId" => $user["userId"],
        "role" => $user["role"]
    ]
]);