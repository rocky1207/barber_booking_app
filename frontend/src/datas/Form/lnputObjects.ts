import { LoginInputType } from "@/types/Form/LoginInputType";
import { loginValidator } from "@/lib/validators/loginValidator";
export const loginInputs: LoginInputType[] = [
    {type: 'text', name: 'username', value: '', placeholder: "Korisničko ime", onAction: loginValidator },
    {type: 'text', name: 'password', value: '', placeholder: "Šifra", onAction: loginValidator },
];
/*
export const registerInputs: LoginInputType[] = [
    {type: 'text', name: 'username', value: '', placeholder: "Korisničko ime", onAction: () => {} },
    {type: 'text', name: 'password', value: '', placeholder: "Šifra", onAction: () => {} },
    {type: 'text', name: 'role', value: '', placeholder: "Uloga", onAction: () => {} },
    {type: 'file', name: 'image', value: '', placeholder: 'Slika', onAction: () => {}}
];
*/