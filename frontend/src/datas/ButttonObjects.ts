import { BasicBtnType } from "@/types/Button/BtnType";
import { ApiBtnType } from "@/types/Button/BtnType";
import { NavigateBtnType  } from "@/types/Button/BtnType";


export const loginBtn: BasicBtnType = {
    validate: 'submit',
    type: 'submit',
    className: '',
    text: 'POŠALJI',
};


export const bookBtn: NavigateBtnType  = {
    validate: 'navigacija',
    type: 'button',
    className: 'bookBtn',
    text: '>',
    onAction: () => {}
};

export const modalActionBtn: NavigateBtnType = {
    validate: 'navigacija',
    type: 'button',
    className: 'deleteBtn',
    text: 'OBRIŠI',
    onAction: () => {}
    }
export const updateActionBtn: NavigateBtnType = {
    validate: 'navigacija',
    type: 'button',
    className: 'updateBtn',
    text: 'AŽURIRAJ',
    onAction: () => {}
};
export const servicesActionBtn: NavigateBtnType = {
    validate: 'navigacija',
    type: 'button',
    className: 'servicesBtn',
    text: 'USLUGE',
    onAction: () => {}
}
    
export const dashboardBtn: NavigateBtnType = {
    validate: 'navigacija',
    type: 'button',
    className: 'dashboardBtn',
    text: 'copyright@rocky2025',
        onAction: () => {}
};
export const changePasswordBtn: NavigateBtnType = {
    validate: 'navigacija',
    type: 'button',
    className: 'changePasswordBtn',
    text: 'Promeni lozinku',
    onAction: () => {}
};

export const termsBtn: NavigateBtnType = {
    validate: 'navigacija',
    type: 'button',
    className: 'termsBtn',
    text: 'TERMINI',
    onAction: () => {}
};
export const continueBtn: NavigateBtnType = {
    validate: 'navigacija',
    type: 'button',
    className: '',
    text: 'NASTAVI',
    onAction: () => {}
};
export const deleteBtn: ApiBtnType = {
    validate: 'api',
    type: 'button',
    className: '',
    text: 'DA',
    head: 'DA LI STE SIGURNI?',
 };
