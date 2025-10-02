<?php
date_default_timezone_set('Europe/Belgrade');
require_once (__DIR__ . "/vendor/autoload.php");
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
?>