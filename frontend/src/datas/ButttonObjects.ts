import { BasicBtnType } from "@/types/Button/BtnType";
import { SubmitBtnType } from "@/types/Button/BtnType";
import { login } from "@/lib/api/login";
import { ApiBtnType } from "@/types/Button/BtnType";
import { NavigateBtnType  } from "@/types/Button/BtnType";


export const loginBtn: BasicBtnType = {
    validate: 'submit',
    type: 'submit',
    className: '',
    text: 'POŠALJI',
    //divClass: '',
};

export const registerBtn: NavigateBtnType = {
    validate: 'api',
    type: 'submit',
    className: '',
    text: 'POŠALJI',
    //divClass: '',
    onAction: () => {}
}

export const bookBtn: NavigateBtnType  = {
    validate: 'navigacija',
    type: 'button',
    className: 'bookBtn',
    text: 'ZAKAŽI',
    //divClass: '',
    onAction: () => {}
};

export const itemBtns: NavigateBtnType[] = [
    {
        validate: 'navigacija',
        type: 'button',
        className: 'updateBtn',
        text: 'AŽURIRAJ',
        //divClass: '',
        onAction: () => {}
    },
    {
        validate: 'navigacija',
        type: 'button',
        className: 'deleteBtn',
        text: 'OBRIŠI',
        //divClass: '',
        onAction: () => {}
    }
];

export const terminsBtn: ApiBtnType = {
        validate: 'api',
        type: 'button',
        className: 'terminBtn',
        text: 'TERMINI',
        action: 'GET_TERMINS',
        //divClass: '',
    };
export const deleteBarberBtn: ApiBtnType = {
        validate: 'api',
        type: 'button',
        className: 'terminBtn',
        text: 'DA',
        action: 'DELETE',
        //divClass: '',
    };
export const updateBarberBtn: ApiBtnType = {
        validate: 'api',
        type: 'button',
        className: 'terminBtn',
        text: 'DA',
        action: 'UPDATE',
        //divClass: '',
    };