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

export const modalActionBtn: NavigateBtnType = {
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
export const servicesActionBtn: NavigateBtnType = {
        validate: 'navigacija',
        type: 'button',
        className: 'servicesBtn',
        text: 'USLUGE',
        //divClass: '',
        onAction: () => {}
    }
    
export const dashboardBtn: NavigateBtnType = {
        validate: 'navigacija',
        type: 'button',
        className: 'terminBtn',
        text: 'copyright@rocky2025',
        //divClass: '',
        onAction: () => {}
    };
export const changePasswordBtn: NavigateBtnType = {
        validate: 'navigacija',
        type: 'button',
        className: 'changePasswordBtn',
        text: 'Promeni lozinku',
        //divClass: '',
        onAction: () => {}
    };

export const terminsBtn: NavigateBtnType = {
        validate: 'navigacija',
        type: 'button',
        className: 'terminBtn',
        text: 'TERMINI',
       // action: 'GET_TERMINS',
        //divClass: '',
        onAction: () => {}
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
export const barberServiceBtn: ApiBtnType = {
        validate: 'api',
        type: 'submit',
        className: 'updateBtn',
        text: 'POŠALJI',
        action: 'INSERT_SERVICE',
        //divClass: '',
    };