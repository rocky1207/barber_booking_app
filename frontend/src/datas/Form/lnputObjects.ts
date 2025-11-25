import { LoginInputType } from "@/types/Form/LoginInputType";
export const loginInputs: LoginInputType[] = [
    {type: 'text', name: 'username', defaultValue: '', placeholder: "Korisničko ime"},
    {type: 'text', name: 'password', defaultValue: '', placeholder: "Lozinka"},
];

export const registerInputs: LoginInputType[] = [
    {type: 'text', name: 'username', defaultValue: '', placeholder: "Korisničko ime"}, 
    {type: 'text', name: 'password', defaultValue: '', placeholder: "Lozinka"},
    {type: 'text', name: 'role', defaultValue: '', placeholder: "Uloga"},
    {type: 'text', name: 'user_email', defaultValue: '', placeholder: "Email"},
];
export const changePasswordInputs: LoginInputType[] = [
    {type: 'text', name: 'oldPassword', defaultValue: '', placeholder: "Unesite staru lozinku"},
    {type: 'text', name: 'newPassword', defaultValue: '', placeholder: "Unesite novu lozinku"},
    {type: 'text', name: 'confirmPassword', defaultValue: '', placeholder: "Potvrdite novu lozinku"},
];
export const forgotPasswordInputs: LoginInputType[] = [
    {type: 'text', name: 'email', defaultValue: '', placeholder: "Email"},
];
export const resetPasswordInputs: LoginInputType[] = [
    {type: 'text', name: 'newPassword', defaultValue: '', placeholder: "Unesite novu lozinku"},
    {type: 'text', name: 'confirmPassword', defaultValue: '', placeholder: "Potvrdite novu lozinku"},
];
export const serviceInputs: LoginInputType[] = [
    {type: 'text', name: 'service', defaultValue: '', placeholder: "Usluga"},
    {type: 'text', name: 'price', defaultValue: '', placeholder: "Cena"},
];
export const appointmentInputs: LoginInputType[] = [
    {type: 'text', name: 'name', defaultValue: '', placeholder: "Ime"},
    {type: 'text', name: 'surname', defaultValue: '', placeholder: "Prezime"},
    {type: 'text', name: 'phone', defaultValue: '', placeholder: "Broj telefona"},
    {type: 'text', name: 'email', defaultValue: '', placeholder: "Email"},
];
export const clientAppointmentInputs: LoginInputType[] = [
    {type: 'text', name: 'name', defaultValue: '', placeholder: "Ime"},
    {type: 'text', name: 'surname', defaultValue: '', placeholder: "Prezime"},
    {type: 'text', name: 'phone', defaultValue: '', placeholder: "Broj telefona"},
];
export const workingHoursInputs: LoginInputType[] = [
    {type: 'date', name: 'start_date', defaultValue: '', placeholder: "Datum od"},
    {type: 'date', name: 'end_date', defaultValue: '', placeholder: "Datum do"},
    {type: 'time', name: 'start_time', defaultValue: '', placeholder: "Vreme od"},
    {type: 'time', name: 'end_time', defaultValue: '', placeholder: "Vreme do"},
];