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