import { LoginInputType } from "@/types/Form/LoginInputType";
import { formValidator } from "@/lib/validators/formValidator";
export const loginInputs: LoginInputType[] = [
    {type: 'text', name: 'username', defaultValue: '', placeholder: "Korisničko ime"},
    {type: 'text', name: 'password', defaultValue: '', placeholder: "Šifra"},
];

export const registerInputs: LoginInputType[] = [
    {type: 'text', name: 'username', defaultValue: '', placeholder: "Korisničko ime"},
    {type: 'text', name: 'password', defaultValue: '', placeholder: "Šifra"},
    {type: 'text', name: 'role', defaultValue: '', placeholder: "Uloga"},
];
