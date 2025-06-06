import { LoginInputType } from "@/types/Form/LoginInputType";
import { formValidator } from "@/lib/validators/formValidator";
export const loginInputs: LoginInputType[] = [
    {type: 'text', name: 'username', value: '', placeholder: "Korisničko ime", onAction: formValidator },
    {type: 'text', name: 'password', value: '', placeholder: "Šifra", onAction: formValidator },
];

export const registerInputs: LoginInputType[] = [
    {type: 'text', name: 'username', value: '', placeholder: "Korisničko ime", onAction: formValidator },
    {type: 'text', name: 'password', value: '', placeholder: "Šifra", onAction: formValidator },
    {type: 'text', name: 'role', value: '', placeholder: "Uloga", onAction: formValidator },
];
