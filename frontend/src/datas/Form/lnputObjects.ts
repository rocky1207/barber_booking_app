import { LoginInputType } from "@/types/Form/LoginInputType";
export const loginInputs: LoginInputType[] = [
    {type: 'text', name: 'username', defaultValue: '', placeholder: "Korisničko ime"},
    {type: 'text', name: 'password', defaultValue: '', placeholder: "Lozinka"},
];

export const registerInputs: LoginInputType[] = [
    {type: 'text', name: 'username', defaultValue: '', placeholder: "Korisničko ime"},
    {type: 'text', name: 'password', defaultValue: '', placeholder: "Lozinka"},
    {type: 'text', name: 'role', defaultValue: '', placeholder: "Uloga"},
];
export const changePasswordInputs: LoginInputType[] = [
    {type: 'text', name: 'oldPassword', defaultValue: '', placeholder: "Unesite staru lozinku"},
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
    {type: 'text', name: 'email', defaultValue: '', placeholder: "Email"},
];