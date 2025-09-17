<?php
function normalizeTimeHI($t) {
    $dt = DateTime::createFromFormat('H:i', $t) ?: DateTime::createFromFormat('G:i', $t);
    !$dt && throw new Exception("Neispravan format vremena: {$t}. Očekujem H:i", 400);
    return $dt->format('H:i:00');
}
?>