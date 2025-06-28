<?php

/*
var_dump($_SERVER['REQUEST_URI']);
var_dump($_SERVER['SCRIPT_NAME']);
exit;
*/
session_start();
require_once(__DIR__ . "/../controllers/AppController.php");

// Uhvati URI
$uri = $_SERVER['REQUEST_URI'];

// Skloni upitne stringove, npr. ?neki=query
$path = parse_url($uri, PHP_URL_PATH);

// Ukloni početni / ako postoji
$path = ltrim($path, '/');

// Ako fizički fajl postoji (npr. static file), posluži ga direktno
$fullPath = __DIR__ . "/{$path}";
if (file_exists($fullPath) && is_file($fullPath)) {
    return require $fullPath;
}

// Ako tražimo nešto unutar `api/`, pokušaj da nađeš u routes/api
$apiPrefix = 'api/';
if (str_starts_with($path, $apiPrefix)) {
    $relativePath = substr($path, strlen($apiPrefix));
    $routeFile = __DIR__ . "/../routes/api/{$relativePath}";

    if (file_exists($routeFile)) {
        require $routeFile;
        exit();
    } else {
        AppController::createMessage("API ruta nije pronađena", 404);
    }
}

// Sve ostalo
AppController::createMessage("Stranica nije pronađena", 404);
exit();
/*
Kod	Značenje
200	OK (sve prošlo)
400	Bad Request (loš input)
401	Unauthorized (nema pristup)
403	Forbidden (nema dozvolu)
404	Not Found
409	Conflict (npr. duplikat unosa)
422	Unprocessable Entity (nevalidni podaci)
500	Internal Server Error
*/
?>
