<?php
session_start();
require_once(__DIR__."/../controllers/AppController.php");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$uri = ltrim($uri, '/');

$fullPath = __DIR__."/{$uri}";

if(file_exists($fullPath) && is_file($fullPath)) {
    return require $fullPath;
};

$apiPrefix = 'api/';

if(str_starts_with($uri, $apiPrefix)) {
    $relativePath = substr($uri, strlen($apiPrefix));
    $routeFile = realpath(__DIR__ . "/../routes/api/{$relativePath}php");
    if($routeFile && file_exists($routeFile)) {
        require $routeFile;
        exit();
    } else {
        //http_response_code(404);
        //echo "API routa nije pronađena";
        //exit();
        AppController::createMessage("API routa nije pronađena", 404);
    }

    //http_response_code(404);
    //echo "Stranica nije pronađena.";
    AppController::createMessage("Stranica nije pronađena", 404);
}
?>