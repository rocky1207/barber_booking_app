<?php
/**
 * Helper funkcija za formatiranje datuma u email-u
 */

/**
 * Formatira datum za prikaz u email-u
 * @param string $date - datum u Y-m-d formatu
 * @return string - formatiran datum (npr. "25. septembar 2025.")
 */
function formatDateForEmail($date) {
    $dateObj = DateTime::createFromFormat('Y-m-d', $date);
    if (!$dateObj) {
        return $date; // Vrati originalni datum ako nije validan
    }
    
    $months = [
        1 => 'januar', 2 => 'februar', 3 => 'mart', 4 => 'april',
        5 => 'maj', 6 => 'jun', 7 => 'jul', 8 => 'avgust',
        9 => 'septembar', 10 => 'oktobar', 11 => 'novembar', 12 => 'decembar'
    ];
    
    $day = $dateObj->format('j');
    $month = $months[(int)$dateObj->format('n')];
    $year = $dateObj->format('Y');
    
    return "{$day}. {$month} {$year}.";
}

/**
 * Formatira vreme za prikaz u email-u
 * @param string $time - vreme u H:i:s formatu
 * @return string - formatirano vreme (npr. "15:30")
 */
function formatTimeForEmail($time) {
    $timeObj = DateTime::createFromFormat('H:i:s', $time);
    if (!$timeObj) {
        return $time; // Vrati originalno vreme ako nije validno
    }
    
    return $timeObj->format('H:i');
}

/**
 * Formatira datum i vreme za prikaz u email-u
 * @param string $date - datum u Y-m-d formatu
 * @param string $time - vreme u H:i:s formatu
 * @return string - formatiran datum i vreme
 */
function formatDateTimeForEmail($date, $time) {
    $formattedDate = formatDateForEmail($date);
    $formattedTime = formatTimeForEmail($time);
    
    return "{$formattedDate} u {$formattedTime}h";
}

/**
 * Proverava da li je datum sutra
 * @param string $date - datum u Y-m-d formatu
 * @return bool
 */
function isDateTomorrow($date) {
    $dateObj = DateTime::createFromFormat('Y-m-d', $date);
    if (!$dateObj) {
        return false;
    }
    
    $tomorrow = new DateTime('tomorrow');
    return $dateObj->format('Y-m-d') === $tomorrow->format('Y-m-d');
}

/**
 * Proverava da li je datum danas
 * @param string $date - datum u Y-m-d formatu
 * @return bool
 */
function isDateToday($date) {
    $dateObj = DateTime::createFromFormat('Y-m-d', $date);
    if (!$dateObj) {
        return false;
    }
    
    $today = new DateTime('today');
    return $dateObj->format('Y-m-d') === $today->format('Y-m-d');
}
?>


