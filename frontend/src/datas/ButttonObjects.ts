import { LoginBtnType } from "@/types/Button/LoginBtnType";
import { login } from "@/lib/api/login";
export const loginBtn: LoginBtnType = {
    type: 'submit',
    className: '',
    text: 'Pošalji',
    divClass: '',
    onAction: login
}