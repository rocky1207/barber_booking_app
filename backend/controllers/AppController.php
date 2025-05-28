<?php
require_once(__DIR__ . "/../models/DatabaseModel.php");
class AppController {
    public const USERNAME_REGEX = "/^[a-zA-Z0-9._]{3,20}$/";
    public const EMAIL_REGEX = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";
    public const PASSWORD_REGEX = "/^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{4,}$/u";
    public const NUMBER_REGEX = "/^\d+$/";
    public const TEXT_REGEX =  "/^[\p{L}]+$/u";
    public const DESCRIPTION_REGEX = "/^.+$/";
    public const SEARCH_REGEX = "/^.*$/";
    public const IMAGE_REGEX = "/^.+\.(jpg|jpeg|png|gif|bmp|webp)$/i";
    public const PRODUCT_ID_REGEX = "/^(0|[1-9][0-9]*)$/";

    public const WRONG_USERNAME_MESSAGE = 'Pogrešno korisničko ime.';
    public const EMAIL_ERROR_MESSAGE = 'Email nije ispravan.';
    public const PASSWORD_ERROR_MESSAGE = 'Lozinka počinje velikim slovom, sadrži najmanje jednu cifru, dozvoljava slova i znak !, i ima minimalnu dužinu od 4 karaktera.';
    public const WRONG_PASSWORD_MESSAGE = 'Pogrešna lozinka.';
    public const QUERY_ERROR_MESSAGE =  'Greška prilikom izvršenja upita';
    public const NO_PRODUCTS_MESSAGE =  'Nema rezultata za navedeni upit';
    public const EMAIL_EXISTS_MESSAGE =  'Email već postoji. Unesite drugi.';
    public const PRODUCT_ID_ERROR_MESSAGE = "Prosleđeni ID proizvoda mora biti pozitivni broj";

    public const TEXT_ERROR_MESSAGE =  'Naziv mora biti popunjen samo slovnim karakterima.';
    public const DESCRIPTION_ERROR_MESSAGE =  'Polje opisa proizvoda mora biti popunjeno.';
    public const IMAGE_ERROR_MESSAGE =  'Slika mora na kraju imati ekstenziju, npr. .jpg ili .png...';
    public const NUMBER_ERROR_MESSAGE =  'Cena i količina mogu biti popunjene samo brojevima.';
    

    public static function databaseConnect() {
        try {
            DatabaseModel::connect();
        } catch(Exception $e) {
            self::createMessage($e->getMessage(), $e->getCode() ?: 500);
        }
    }
    public static function createMessage($message, $code=200) {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode([
            "status" => $code,
            "message" => $message
        ]);
        
        exit();
    }

    public static function validateInputs($inputs, $regex, $messages) {
        $data = [];
        foreach($inputs as $key => $input) {
            ${$key} = isset($input) ? trim($input) : '';
            !preg_match($regex[$key], ${$key}) && self::createMessage($messages[$key], 420);
            $data[$key] = ${$key};
        }
        return $data;
    }
}
?>