import { DeleteReturnType } from "../Api/ApiReturnType";
export interface BasicBtnType {
    validate: string;
    type: 'submit' | 'button';
    className: string;
    text: string;
};

export interface NavigateBtnType extends BasicBtnType {
  onAction: () => void;
};

// Dugme za brisanje frizera

export interface ApiBtnType extends BasicBtnType {
  id?: number;
  head: string;
  action?: string;
  onAction?: (action: string, id: number) => Promise<DeleteReturnType>;
};
export interface ApiBtnRefType extends ApiBtnType {
  dialogRef?: React.RefObject<HTMLDialogElement | null>;
};

