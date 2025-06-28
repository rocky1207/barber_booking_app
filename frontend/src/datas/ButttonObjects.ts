import { BasicBtnType } from "@/types/Button/BtnType";
import { ApiBtnType } from "@/types/Button/BtnType";
import { NavigateBtnType  } from "@/types/Button/BtnType";


export const loginBtn: BasicBtnType = {
    validate: 'submit',
    type: 'submit',
    className: '',
    text: 'POŠALJI',
    //divClass: '',
};


export const bookBtn: NavigateBtnType  = {
    validate: 'navigacija',
    type: 'button',
    className: 'bookBtn',
    text: 'ZAKAŽI',
    //divClass: '',
    onAction: () => {}
};

export const modalActionBtn: NavigateBtnType =
{
        validate: 'navigacija',
        type: 'button',
        className: 'deleteBtn',
        text: 'OBRIŠI',
        //divClass: '',
        onAction: () => {}
    }
export const updateActionBtn: NavigateBtnType = {
        validate: 'navigacija',
        type: 'button',
        className: 'updateBtn',
        text: 'AŽURIRAJ',
        //divClass: '',
        onAction: () => {}
    };
    
 


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
        className: 'deleteBtn',
        text: 'DA',
        action: 'DELETE',
        //divClass: '',
    };
export const updateBarberBtn: ApiBtnType = {
        validate: 'api',
        type: 'button',
        className: 'updateBtn',
        text: 'AŽURIRAJ',
        action: 'UPDATE',
        //divClass: '',
    };