<?php
/**
 * Test skripta za email reminder sistem
 * Pozovite ovu skriptu direktno za testiranje
 */

require_once (__DIR__ . '/bootstrap.php');
require_once (__DIR__ . '/controllers/appointment/EmailReminderController.php');

echo "=== EMAIL REMINDER TEST ===\n";
echo "Datum: " . date('Y-m-d H:i:s') . "\n\n";

try {
    $emailController = new EmailReminderController();
    
    // Test 1: Dohvati appointment-e za sutra
    echo "1. Dohvatanje appointment-a za sutra...\n";
    $appointments = $emailController->getTomorrowReminders();
    
    if ($appointments['success']) {
        $count = count($appointments['data']);
        echo "   ✓ Pronađeno {$count} appointment-a za sutra\n";
        
        if ($count > 0) {
            echo "   Klijenti:\n";
            foreach ($appointments['data'] as $appointment) {
                echo "   - {$appointment['name']} {$appointment['surname']} ({$appointment['email']})\n";
                echo "     Frizer: {$appointment['barberName']}\n";
                echo "     Usluge: " . count($appointment['services']) . "\n";
            }
        }
    } else {
        echo "   ✗ Greška: " . $appointments['message'] . "\n";
    }
    
    echo "\n";
    
    // Test 2: Pošalji email podsetnike
    echo "2. Slanje email podsetnika...\n";
    $result = $emailController->sendTomorrowReminders();
    
    if ($result['success']) {
        echo "   ✓ Email podsetnici poslati uspešno\n";
        echo "   Poslato: {$result['data']['sentCount']} od {$result['data']['totalCount']}\n";
        
        if (!empty($result['data']['errors'])) {
            echo "   Greške:\n";
            foreach ($result['data']['errors'] as $error) {
                echo "   - {$error}\n";
            }
        }
    } else {
        echo "   ✗ Greška: " . $result['message'] . "\n";
    }
    
    echo "\n";
    
    // Test 3: Proveri SMTP konfiguraciju
    echo "3. Provera SMTP konfiguracije...\n";
    $smtpHost = $_ENV['SMTP_HOST'] ?? 'Nije podešeno';
    $smtpUsername = $_ENV['SMTP_USERNAME'] ?? 'Nije podešeno';
    $smtpFromEmail = $_ENV['SMTP_FROM_EMAIL'] ?? 'Nije podešeno';
    
    echo "   SMTP Host: {$smtpHost}\n";
    echo "   SMTP Username: {$smtpUsername}\n";
    echo "   From Email: {$smtpFromEmail}\n";
    
    if ($smtpHost === 'Nije podešeno' || $smtpUsername === 'Nije podešeno') {
        echo "   ⚠ UPOZORENJE: SMTP konfiguracija nije potpuna!\n";
        echo "   Kreirajte .env fajl sa potrebnim SMTP parametrima.\n";
    } else {
        echo "   ✓ SMTP konfiguracija je podešena\n";
    }
    
} catch (Exception $e) {
    echo "✗ GREŠKA: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}

echo "\n=== KRAJ TESTA ===\n";
?>














