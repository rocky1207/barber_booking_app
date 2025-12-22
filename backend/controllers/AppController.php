<?php
require_once(__DIR__ . "/../models/DatabaseModel.php");
class AppController {
    public const FULL_NAME_REGEX = "/^[A-Za-zČĆŠĐŽčćšđž ]{2,60}$/";
    public const USERNAME_REGEX = "/^[\p{L}0-9._]{3,20}$/u";
    public const PASSWORD_REGEX = "/^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{4,}$/u";
    public const ROLE_REGEX = "/^(admin|user|student)$/";
    public const TRUE_OR_FALSE_REGEX = "/^(0|1)$/";
    public const FILE_REGEX = "/^$|^.+\.(jpg|jpeg|png|webp)$/i";
    public const INT_REGEX = "/^[1-9][0-9]*$/";
    public const SERVICE_REGEX = '/^[\p{L}0-9 .,!?()\-:;\'"\/\\\\@+%&]{3,255}$/u';
    public const PRICE_REGEX = "/^[0-9]{1,8}$/";
    public const DESCRIPTION_REGEX = "/^[^<>]*$/"/*"/^[\p{L}0-9.,!?\"'@+%&()-:;\/\\\\\- \n]{3,1000}$/u"*/;
    public const NAME_REGEX = "/^[A-Za-zŠĐČĆŽšđčćž ]+$/";
    public const PHONE_REGEX = "/^\d+$/";
    public const EMAIL_REGEX = "/^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$/" /*/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/*/; 
    public const DATE_REGEX = "/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/";
    public const TIME_REGEX = "/^(?:[01]\d|2[0-3]):[0-5]\d$/";

    public const FULL_NAME_ERROR_MESSAGE = 'Dozvoljena su samo slova i razmak, najmanje 2 a najviše 60 karaktera.';
    public const INT_ERROR_MESSAGE = 'Prosleđeni parametar mora biti broj.';
    public const USERNAME_ERROR_MESSAGE = 'Dozvoljena su slova i brojevi, bez razmaka, najmanje 3 a najviše 20 kakraktera.';
    public const PASSWORD_ERROR_MESSAGE = 'Lozinka počinje velikim slovom, sadrži najmanje jednu cifru, dozvoljava slova i znak !, i ima minimalnu dužinu od 4 karaktera.';
    public const ROLE_ERROR_MESSAGE = 'Unesite "admin" ili "user ili student".';
    public const SELECT_FIELD_ERROR_MESSAGE = 'SELECT polje mora biti izabrano';
    public const FILE_NAME_ERROR_MESSAGE =  'Naziv slike može sadržati samo tekstualne karaktere.';
    public const FILE_ERROR_MESSAAGE = 'Dozvoljeni su samo JPEG, PNG ili WEBP formati slika, maksimalne veličine do 5MB.';
    public const QUERY_ERROR_MESSAGE = 'Greška prilikom izvršenja upita';
    public const WRONG_USERNAME_MESSAGE = 'Pogrešno korisničko ime.';
    public const WRONG_PASSWORD_MESSAGE = 'Pogrešna lozinka.';
    public const NO_RESULT_MESSAGE =  'Nema rezultata za navedeni upit';

    public const SERVICE_ERROR_MESSAGE = 'U polje "Usluga" uneli ste nedozvoljene karaktere, poput <, > i slično.';
    public const SERVICE_PRICE_ERROR_MESSAGE = 'U polje "Cena" dozvoljeno je uneti samo cele brojeve, do 8 karaktera.';
    public const SERVICE_DESCRIPTION_ERROR_MESSAGE = 'U polje "Opis" uneli ste nedozvoljene karaktere, poput <, > i slično.';

    public const NAME_ERROR_MESSAGE = 'U polje za ime i prezime dozvoljeni su samo slovni kakrakteri.';
    public const PHONE_ERROR_MESSAGE = 'Unesite brojeve u polje za broj telefona.';
    public const EMAIL_ERROR_MESSAGE = 'Neispravan format email adrese.';

    public const DATE_ERROR_MESSAGE = 'Neispravan format datuma.';
    public const TIME_ERROR_MESSAGE = 'Neispravan format vremena.';
     /*
    public const EMAIL_REGEX = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";
    public const NUMBER_REGEX = "/^\d+$/";
    public const TEXT_REGEX =  "/^[\p{L}]+$/u";
    public const DESCRIPTION_REGEX = "/^.+$/";
    public const SEARCH_REGEX = "/^.*$/";

    
    
    public const PRODUCT_ID_REGEX = "/^(0|[1-9][0-9]*)$/";

    
    
    public const EMAIL_ERROR_MESSAGE = 'Email nije ispravan.';
   
    
    public const EMAIL_EXISTS_MESSAGE =  'Email već postoji. Unesite drugi.';
    public const PRODUCT_ID_ERROR_MESSAGE = "Prosleđeni ID proizvoda mora biti pozitivni broj";

    public const TEXT_ERROR_MESSAGE =  'Naziv mora biti popunjen samo slovnim karakterima.';
    public const DESCRIPTION_ERROR_MESSAGE =  'Polje opisa proizvoda mora biti popunjeno.';
    public const IMAGE_ERROR_MESSAGE =  'Slika mora na kraju imati ekstenziju, npr. .jpg ili .png...';
    public const NUMBER_ERROR_MESSAGE =  'Cena i količina mogu biti popunjene samo brojevima.';
    */

    public static function databaseConnect() {
        try {
            DatabaseModel::connect();
        } catch(Exception $e) {
            self::createMessage($e->getMessage(), $e->getCode() ?: 500);
        }
    }
    public static function createMessage($message, $code=200) {
        
        if (!is_int($code) || $code < 100 || $code > 599) {
            $code = 500;
        }
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode([
            "status" => $code,
            "message" => $message
        ]);
        exit();
    }

    public static function validateInputs($inputs, $regex, $messages, $code) {
        $data = [];
        foreach($inputs as $key => $input) {
            ${$key} = isset($input) ? trim($input) : '';
            if($key !== 'file') {
                ${$key} === '' && self::createMessage('Tekstualna polja moraju biti popunjena', 422);
            }
            
            !preg_match($regex[$key], ${$key}) && self::createMessage($messages[$key], $code);
            if($key === 'id' || $key === 'price') {
                $data[$key] = (int)${$key};
            } else {
                $data[$key] = ${$key};
            }
            
        }
        return $data;
    }
    public static function comparePasswords($password, $confirmedPassword) {
        if($password !== $confirmedPassword) {
            self::createMessage('Novouneta lozinka mora biti identična u oba polja!', 422);
        } 
        return true;
    }
    public static function verifyRequestMethod($expectedMethod) {
       $method = strtoupper($expectedMethod);
       if($_SERVER['REQUEST_METHOD'] !== $method) {
        self::createMessage("Samo {$method} metod je dozvoljen.", 405);
       } 
    }

    public static function deleteUserImage($fileName) {
        $uploadDir = (__DIR__ . "/../public/images");
        $filePath = $uploadDir . '/' . basename($fileName);
        if(file_exists($filePath)) unlink($filePath);
        
    }
}
?>