import { LoginBtnType } from "@/types/Button/LoginBtnType";
import { login } from "@/lib/api/login";
export const loginBtn: LoginBtnType = {
    type: 'submit',
    className: '',
    text: 'POŠALJI',
    divClass: '',
    onAction: login
};

export const registerBtn: LoginBtnType = {
    type: 'submit',
    className: '',
    text: 'POŠALJI',
    divClass: '',
    onAction: login
}

export const bookBtn: LoginBtnType = {
    type: 'button',
    className: 'bookBtn',
    text: 'ZAKAŽI',
    divClass: '',
    onAction: login
};

export const itemBtns: LoginBtnType[] = [
    {
        type: 'button',
        className: 'terminBtn',
        text: 'TERMINI',
        divClass: '',
        onAction: login
    },
    {
        type: 'button',
        className: 'updateBtn',
        text: 'AŽURIRAJ',
        divClass: '',
        onAction: login
    },
    {
        type: 'button',
        className: 'deleteBtn',
        text: 'OBRIŠI',
        divClass: '',
        onAction: login
    }
];