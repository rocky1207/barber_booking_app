import { BasicBarberType } from "../Barbers/BarbersType";
import { BasicApiReturnType } from "./ApiReturnType";
import { ForgotPasswordType } from "../Barbers/BarbersType";
export interface BasicReturnDataType {
    success: boolean;
    status: number;
    message: string;
}
export interface SingleBarberReturnType extends BasicReturnDataType {
    data: BasicBarberType;
}
export interface MultiBarberReturnType extends BasicReturnDataType {
    data: BasicBarberType[];
}

export interface DeleteBarberReturnType {
    success: boolean; 
    message?: string; 
    data?: SingleBarberReturnType;
    actionDone?: string;
}



export interface ReturnForgotPasswordType extends BasicApiReturnType {
    data?:ForgotPasswordType;
    actionDone?: string;
}
