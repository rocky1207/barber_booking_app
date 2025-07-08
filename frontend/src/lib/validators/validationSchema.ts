import { ValidationSchemaType } from "@/types/Form/ValidationSchemaType";

export const loginValidationSchema: ValidationSchemaType = {
    username: {
        required: true,
        pattern: /^[\p{L}0-9._]{3,20}$/u, // /^[A-Za-z0-9]{3,20}$/,
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
        pattern: /^[\p{L}0-9._]{3,20}$/u, // /^[A-Za-z0-9]{3,20}$/,
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
        pattern: /^(admin|user|student)$/,
        errorMessage: 'Unesite "admin" ili "user".'
    },
    file: {
        required: false,
        pattern: /^$|^.+\.(jpg|jpeg|png|webp)$/i,
        fileErrorMessage: 'Dozvoljeni su samo JPEG, PNG ili WEBP formati slika, maksimalne veličine do 5MB.',
        errorMessage: 'Naziv slike mora imati .jpg, .jpeg, .png ili .webp ekstenziju.'
    }
};
export const updateValidationSchema: ValidationSchemaType = {
    username: {
        required: true,
        pattern: /^[\p{L}0-9._]{3,20}$/u, // /^[A-Za-z0-9]{3,20}$/,
        errorMessage: 'Dozvoljena su slova i brojevi, bez razmaka, najmanje 3 a najviše 20 kakraktera.'
    },
    role: {
        required: true,
        pattern: /^(admin|user|student)$/,
        errorMessage: 'Unesite "admin" ili "user".'
    },
    file: {
        required: false,
        pattern: /^$|^.+\.(jpg|jpeg|png|webp)$/i,
        fileErrorMessage: 'Dozvoljeni su samo JPEG, PNG ili WEBP formati slika, maksimalne veličine do 5MB.',
        errorMessage: 'Naziv slike mora imati .jpg, .jpeg, .png ili .webp ekstenziju.'
    }
};
export const changePasswordValidationSchema: ValidationSchemaType = {
    oldPassword: {
        required: true,
        pattern: /^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{8,}$/u,
        errorMessage: 'Trenutno važeća lozinka nije ispravna.'
    },
    newPassword: {
        required: true,
        pattern: /^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{8,}$/u,
        errorMessage: 'Lozinka počinje velikim slovom, obavezan je najmanje 1 broj, dozvoljava slova i znak "!", mora imati minimalnu dužinu od 8 karaktera.'
    },
    confirmPassword: {
        required: true,
        pattern: /^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{8,}$/u,
        errorMessage: 'Lozinka počinje velikim slovom, obavezan je najmanje 1 broj, dozvoljava slova i znak "!", mora imati minimalnu dužinu od 8 karaktera.'
    }
};

export const serviceValidationSchema: ValidationSchemaType = {
    service: {
        required: true,
        pattern: /^[\p{L}0-9 .,!?()\-:;'"\/\\@+%&]{1,255}$/u, // /^[A-Za-z0-9]{3,20}$/,
        errorMessage: 'U polje "Usluga" uneli ste nedozvoljene karaktere, poput <, > i slično.'
    },
    price: {
        required: true,
        pattern: /^[0-9]{1,6}$/,
        errorMessage: 'U polje "Cena" dozvoljeno je uneti samo cele brojeve.'
    },
    description: {
        required: false,
        pattern: /^[\p{L}0-9.,!?'"@+%&()\/\\\- \n]{3,1000}$/u,
        errorMessage: 'U polje "Opis" uneli ste nedozvoljene karaktere, poput <, > i slično.'
    }
};