<?php
// chdir(__DIR__ . '/..'); pozicioniraj se u backend folder ako treba
require_once (__DIR__ . '/../bootstrap.php');
require_once (__DIR__ . '/../models/user/DeleteOldErrorLogsModel.php');

$model = new DeleteOldErrorLogsModel();
$result = $model->deleteOldErrorLogs();
/*
$logDir = __DIR__ . '/../tmp';
if (!is_dir($logDir)) { @mkdir($logDir, 0777, true); }
@file_put_contents($logDir . '/cleanup_run.log', '['.date('Y-m-d H:i:s').'] ' . json_encode($result, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);
*/
// Za CLI izlaz
echo json_encode($result, JSON_UNESCAPED_UNICODE) . PHP_EOL;

?>