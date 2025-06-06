<?php

header('Content-Type: application/json');

$response = [
    'status' => 200,
    'message' => 'Test ruta radi',
    'data' => true
];

echo json_encode($response);
exit();
