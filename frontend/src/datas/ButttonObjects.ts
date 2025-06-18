import { BasicBtnType } from "@/types/Button/BtnType";


import { ApiBtnType } from "@/types/Button/BtnType";
import { NavigateBtnType  } from "@/types/Button/BtnType";


export const loginBtn: NavigateBtnType = {
    validate: 'api',
    type: 'submit',
    className: '',
    text: 'POŠALJI',
    divClass: '',
    onAction: () => {}
};

export const registerBtn: BasicBtnType = {
    validate: 'api',
    type: 'submit',
    className: '',
    text: 'POŠALJI',
    divClass: '',
   // onAction: login
}

export const bookBtn: NavigateBtnType  = {
    validate: 'navigacija',
    type: 'button',
    className: 'bookBtn',
    text: 'ZAKAŽI',
    divClass: '',
    onAction: () => {}
};

export const terminsBtn: ApiBtnType = {
        validate: 'api',
        type: 'button',
        className: 'terminBtn',
        text: 'TERMINI',
        divClass: '',
    };

export const itemBtns: NavigateBtnType[] = [
    {
        validate: 'navigacija',
        type: 'button',
        className: 'updateBtn',
        text: 'AŽURIRAJ',
        divClass: '',
        onAction: () => {}
    },
    {
        validate: 'navigacija',
        type: 'button',
        className: 'deleteBtn',
        text: 'OBRIŠI',
        divClass: '',
        onAction: () => {}
    }
];

export const deleteBarberBtn: ApiBtnType = {
        validate: 'api',
        type: 'button',
        className: 'terminBtn',
        text: 'DA',
        divClass: '',
    };