import { LoginInputType } from "@/types/Form/InputType";
export const loginInputs: LoginInputType[] = [
    {type: 'text', name: 'username', placeholder: "Korisničko ime" },
    {type: 'text', name: 'password', placeholder: "Šifra" },
];
export const registerInputs: LoginInputType[] = [
    {type: 'text', name: 'username', placeholder: "Korisničko ime" },
    {type: 'text', name: 'password', placeholder: "Šifra" },
    {type: 'text', name: 'role', placeholder: "Uloga" },
];