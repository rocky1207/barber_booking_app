import { ValidationSchemaType } from "@/types/Form/ValidationSchemaType";

export const loginValidationSchema: ValidationSchemaType = {
    username: {
        required: true,
        pattern: /^[\p{L}0-9._]{3,20}$/u,
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
        pattern: /^[\p{L}0-9._]{3,20}$/u,
        errorMessage: 'Dozvoljena su slova i brojevi, bez razmaka, najmanje 3 a najviše 20 kakraktera.'
    },
    password: {
        required: true,
        pattern: /^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{8,}$/u,
        errorMessage: 'Lozinka počinje velikim slovom, obavezan je najmanje 1 broj, dozvoljava slova i znak "!", mora imati minimalnu dužinu od 8 karaktera.'
    },
    user_email: {
        required: true,
        pattern: /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$/,
        errorMessage: 'Neispravan format email adrese.'
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
export const updateValidationSchema: ValidationSchemaType = {
    username: {
        required: true,
        pattern: /^[\p{L}0-9._]{3,20}$/u,
        errorMessage: 'Dozvoljena su slova i brojevi, bez razmaka, najmanje 3 a najviše 20 kakraktera.'
    },
    role: {
        required: true,
        pattern: /^(admin|user|student)$/,
        errorMessage: 'Unesite "admin" ili "user" ili "student".'
    },
    suspended: {
        required: true,
        pattern: /^(0|1)$/,
        errorMessage: 'SELECT polje mora biti popunjeno.'
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
export const resetPasswordValidationSchema: ValidationSchemaType = {
    newPassword: {
        required: true,
        pattern: /^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{8,}$/u,
        errorMessage: 'Lozinka počinje velikim slovom, obavezan je najmanje 1 broj, dozvoljava slova i znak "!", mora imati minimalnu dužinu od 8 karaktera.'
    },
    confirmPassword: {
        required: true,
        pattern: /^(?=\p{Lu})(?=.*\d)[\p{L}\d!]{8,}$/u,
        errorMessage: 'Lozinka počinje velikim slovom, obavezan je najmanje 1 broj, dozvoljava slova i znak "!", mora imati minimalnu dužinu od 8 karaktera.'
    },
};

export const serviceValidationSchema: ValidationSchemaType = {
    service: {
        required: true,
        pattern: /^[\p{L}0-9 .,!?()\-:;'"\/\\@+%&]{1,255}$/u,
        errorMessage: 'U polje "Usluga" uneli ste nedozvoljene karaktere, poput <, > i slično.'
    },
    price: {
        required: true,
        pattern: /^[0-9]{1,9}$/,
        errorMessage: 'U polje "Cena" dozvoljeno je uneti samo cele brojeve, do 9 karaktera.'
    },
    description: {
        required: false,
        pattern: /^[^<>]*$/,
        errorMessage: 'U polje "Opis" uneli ste nedozvoljene karaktere, poput <, > i slično.'
    }
};

export const appointmentValidationSchema: ValidationSchemaType = {
    name: {
        required: true,
        pattern: /^[A-Za-zŠĐČĆŽšđčćž ]+$/,
        errorMessage: 'U polje za ime dozvoljeni su samo slovni karakteri.'
    },
    surname: {
        required: true,
        pattern: /^[A-Za-zŠĐČĆŽšđčćž ]+$/,
        errorMessage: 'U polje za prezime dozvoljeni su samo slovni karakteri.'
    },
    phone: {
        required: true,
        pattern: /^\d+$/,
        errorMessage: 'Unesite brojeve u polje za broj telefona.'
    },
    email: {
        required: false,
        pattern: /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$/,
        errorMessage: 'Neispravan format email adrese.'
    }
};

export const workingHoursValidationSchema: ValidationSchemaType = {
    start_date: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        errorMessage: 'Datum mora biti u formatu YYYY-MM-DD.'
    },
    end_date: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        errorMessage: 'Datum mora biti u formatu YYYY-MM-DD.'
    },
    start_time: {
        required: true,
        pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        errorMessage: 'Vreme mora biti u formatu HH:MM.'
    },
    end_time: {
        required: true,
        pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        errorMessage: 'Vreme mora biti u formatu HH:MM.'
    }
};

export const emailValidationSchema: ValidationSchemaType = {
    email: {
        required: true,
        pattern: /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$/,
        errorMessage: 'Neispravan format email adrese.'
    },
};