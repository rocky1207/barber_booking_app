import { ReturnType } from "../Api/ReturnType";
export interface BasicBtnType {
    validate: string;
    type: 'submit' | 'button';
    className: string;
    text: string;
    divClass: string;
//    onAction: (data: {username: string; password: string;}) => any;
};
/*
export interface LoginBtnType extends BasicBtnType {
  onAction: (url: string, data: { username: string; password: string }) => Promise<ReturnType>;
};
*/
// Register dugme (možda ima dodatni field kasnije)
/*
export interface RegisterBtnType extends BasicBtnType {
  onAction: (data: { username: string; password: string; role: string }) => Promise<ReturnType>;
};
*/
export interface NavigateBtnType extends BasicBtnType {
  onAction: () => void;
};

// Dugme za brisanje frizera

export interface ApiBtnType extends BasicBtnType {
  id?: string;
  onAction?: (url: string, id: string) => Promise<void>;
};

//export type AnyBtnType = NavigateBtnType | ApiBtnType;