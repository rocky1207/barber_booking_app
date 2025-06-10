<?php
require_once (__DIR__ . "/../../../controllers/AppController.php");
header('Content-Type: application/json');
$uploadDir = __DIR__ . '/../../../public/images/';
/*if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}*/

// Provera da li je fajl prosleđen
if (!isset($_FILES['file'])) {
    AppController::createMessage('Fajl nije prosleđen.', 400);
}

// Maksimalna dozvoljena veličina fajla (5MB)
$maxSize = 5 * 1024 * 1024;
$_FILES['file']['size'] > $maxSize && AppController::createMessage(AppController::FILE_ERROR_MESSAAGE, 413);


// MIME tipovi koje dozvoljavamo
$allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
$mimeType = mime_content_type($_FILES['file']['tmp_name']);
!in_array($mimeType, $allowedMimeTypes) && AppController::createMessage(AppController::FILE_ERROR_MESSAAGE, 415);


// Ekstenzije koje dozvoljavamo (dodatna validacija)
$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
$originalFileName = basename($_FILES['file']['name']);
$extension = strtolower(pathinfo($originalFileName, PATHINFO_EXTENSION));

!in_array($extension, $allowedExtensions) && AppController::createMessage(AppController::FILE_ERROR_MESSAAGE, 415);


// Kreiraj jedinstveno ime fajla da ne bi došlo do preklapanja
$uniqueName = uniqid('img_', true) . '.' . $extension;
$targetPath = $uploadDir . $uniqueName;
$fileTmp = $_FILES['file']['tmp_name'];

// Pokušaj premeštanja fajla
if (move_uploaded_file($fileTmp, $targetPath)) {
    // Vrati relativni URL slike koji frontend može koristiti
    $url = '/images/' . $uniqueName;
    echo json_encode([
        'fileName' => $uniqueName,    
        'url' => $url
    ]);
} else {
    AppController::createMessage('Greška prilikom čuvanja fajla.', 500);
}
