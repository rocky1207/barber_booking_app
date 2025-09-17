<?php
function normalizeDateDMY($d) {
    $dt = DateTime::createFromFormat('d/m/Y', $d);
    !$dt && throw new Exception("Neispravan format datuma: {$d}. Očekujem d/m/Y.", 400);
    return $dt->format('Y-m-d');
}
?>