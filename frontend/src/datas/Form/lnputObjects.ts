import { InputFieldsType } from "@/types/Form/InputFieldsType";
export const loginInputs: InputFieldsType[] = [
    {type: 'text', name: 'username', defaultValue: '', placeholder: "Korisničko ime *", required: true},
    {type: 'text', name: 'password', defaultValue: '', placeholder: "Lozinka *", required: true},
];

export const registerInputs: InputFieldsType[] = [
    {type: 'text', name: 'username', defaultValue: '', placeholder: "Korisničko ime *", required: true}, 
    {type: 'text', name: 'password', defaultValue: '', placeholder: "Lozinka *", required: true},
    {type: 'text', name: 'role', defaultValue: '', placeholder: "Uloga *", required: true},
    {type: 'text', name: 'user_email', defaultValue: '', placeholder: "Email *", required: true},
];
export const changePasswordInputs: InputFieldsType[] = [
    {type: 'text', name: 'oldPassword', defaultValue: '', placeholder: "Unesite staru lozinku *", required: true},
    {type: 'text', name: 'newPassword', defaultValue: '', placeholder: "Unesite novu lozinku *", required: true},
    {type: 'text', name: 'confirmPassword', defaultValue: '', placeholder: "Potvrdite novu lozinku *", required: true},
];
export const forgotPasswordInputs: InputFieldsType[] = [
    {type: 'text', name: 'email', defaultValue: '', placeholder: "Email *", required: true},
];
export const resetPasswordInputs: InputFieldsType[] = [
    {type: 'text', name: 'newPassword', defaultValue: '', placeholder: "Unesite novu lozinku *", required: true},
    {type: 'text', name: 'confirmPassword', defaultValue: '', placeholder: "Potvrdite novu lozinku *", required: true},
];
export const serviceInputs: InputFieldsType[] = [
    {type: 'text', name: 'service', defaultValue: '', placeholder: "Usluga", required: false},
    {type: 'text', name: 'price', defaultValue: '', placeholder: "Cena", required: false},
];
export const appointmentInputs: InputFieldsType[] = [
    {type: 'text', name: 'name', defaultValue: '', placeholder: "Ime *", required: true},
    {type: 'text', name: 'surname', defaultValue: '', placeholder: "Prezime *", required: true},
    {type: 'text', name: 'phone', defaultValue: '', placeholder: "Broj telefona *", required: true},
    {type: 'text', name: 'email', defaultValue: '', placeholder: "Email (opciono)", required: false},
];
export const clientAppointmentInputs: InputFieldsType[] = [
    {type: 'text', name: 'name', defaultValue: '', placeholder: "Ime *", required: true},
    {type: 'text', name: 'surname', defaultValue: '', placeholder: "Prezime *", required: true},
    {type: 'text', name: 'phone', defaultValue: '', placeholder: "Broj telefona *", required: true},
];
export const workingHoursInputs: InputFieldsType[] = [
    {type: 'date', name: 'start_date', defaultValue: '', placeholder: "Datum od", required: false},
    {type: 'date', name: 'end_date', defaultValue: '', placeholder: "Datum do", required: false},
    {type: 'time', name: 'start_time', defaultValue: '', placeholder: "Vreme od", required: false},
    {type: 'time', name: 'end_time', defaultValue: '', placeholder: "Vreme do", required: false},
];