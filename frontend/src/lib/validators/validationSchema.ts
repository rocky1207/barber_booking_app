import { ValidationSchemaType } from "@/types/Form/ValidationSchemaType";

export const loginValidationSchema: ValidationSchemaType = {
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
        errorMessage: 'Dozvoljena su slova i brojevi, bez razmaka, najmanje 3 a najviše kakraktera.'
    },
    password: {
        required: true,
        pattern: /^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{8,}$/u,
        errorMessage: 'Lozinka počinje velikim slovom, obavezan je najmanje 1 broj, dozvoljava slova i znak "!", mora imati minimalnu dužinu od 8 karaktera.'
    },
    confirmPassword: {
        required: true,
        errorMessage: 'Lozinke moraju biti identične.'
    },
    role: {
        required: true,
        pattern: /^\p{Ll}{3,20}$/u,
        validate: (val) => ['admin', 'user'].includes(val),
        errorMessage: 'Dozvoljeni su samo mali slovni karakteri, najmanje 3 a najviše 20 karaktera.'
    },
    file: {
        required: false,
        errorMessage: 'Uneta slika mora biti fajl.'
    }
};