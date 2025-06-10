import { ValidationSchemaType } from "@/types/Form/ValidationSchemaType";

export const formValidationSchema: ValidationSchemaType = {
    username: {
        required: true,
        pattern: /^[A-Za-z0-9]{3,20}$/,
        errorMessage: 'Pogrešan username'
    },
    password: {
        required: true,
        pattern: /^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{8,}$/u,
        errorMessage: 'Pogrešna lozinka'
    }
};

export const registerValidationSchema: ValidationSchemaType = {
    username: {
        required: true,
        pattern: /^[A-Za-z0-9]{3,20}$/,
        errorMessage: 'Dozvoljena su slova i brojevi, bez razmaka, najmanje 3 a najviše 20 kakraktera.'
    },
    password: {
        required: true,
        pattern: /^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{8,}$/u,
        errorMessage: 'Lozinka počinje velikim slovom, obavezan je najmanje 1 broj, dozvoljava slova i znak "!", mora imati minimalnu dužinu od 8 karaktera.'
    },
    /*confirmPassword: {
        required: true,
        errorMessage: 'Lozinke moraju biti identične.'
    },*/
    role: {
        required: true,
        pattern: /^(admin|user)$/,
        errorMessage: 'Unesite "admin" ili "user".'
    },
    file: {
        required: false,
        pattern: /^$|^.+\.(jpg|jpeg|png|webp)$/i,
        fileErrorMessage: 'Dozvoljeni su samo JPEG, PNG ili WEBP formati slika, maksimalne veličine do 5MB.',
        errorMessage: 'Naziv slike mora imati .jpg, .jpeg, .png ili .webp ekstenziju.'
    }
};