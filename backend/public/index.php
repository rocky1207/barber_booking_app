<?php

/*
var_dump($_SERVER['REQUEST_URI']);
var_dump($_SERVER['SCRIPT_NAME']);
exit;
*/
session_start();
//require_once __DIR__ . '/../vendor/autoload.php';
require_once(__DIR__ . "/../controllers/AppController.php");
// Auto-setup MySQL EVENT for daily cleanup (idempotent)
try {
    require_once(__DIR__ . '/../models/appointment/CleanupCostumersModel.php');
    $cleanupModel = new CleanupCostumersModel();
    $cleanupModel->setupDailyCleanupEvent();
} catch (Throwable $e) {
    // Silently ignore to avoid breaking requests if permissions are missing
}

// Fallback: simple daily trigger without MySQL EVENT (executes once per day after cutoff time)
try {
    $cutoffTime = '00:01:00'; // HH:MM:SS
    $today = (new DateTime('now'))->format('Y-m-d');
    $nowTime = (new DateTime('now'))->format('H:i:s');
    $tmpDir = __DIR__ . '/../tmp';
    $stampFile = $tmpDir . '/cleanup_last_run.txt';
    if (!is_dir($tmpDir)) { @mkdir($tmpDir, 0777, true); }
    $lastRun = file_exists($stampFile) ? trim(@file_get_contents($stampFile)) : '';
    if ($nowTime >= $cutoffTime && $lastRun !== $today) {
        require_once(__DIR__ . '/../controllers/appointment/CleanupCostumersController.php');
        $cleanupController = new CleanupCostumersController();
        // Run immediate cleanup for all past dates
        $cleanupController->runNow();
        @file_put_contents($stampFile, $today);
    }
} catch (Throwable $e) {
    // ignore
}

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
