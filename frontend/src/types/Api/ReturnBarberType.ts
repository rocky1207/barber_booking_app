import { BasicBarberType } from "../Barbers/BarbersType";
import { BasicApiReturnType } from "./ApiReturnType";
import { ForgotPasswordType } from "../Barbers/BarbersType";
export interface SingleBarberReturnType extends BasicApiReturnType {
    data?: BasicBarberType;
}
export interface MultiBarberReturnType extends BasicApiReturnType {
    data: BasicBarberType[];
}

export interface RegisterUpdateBarberReturnType extends BasicApiReturnType {
    data?: SingleBarberReturnType;
}
export interface DeleteBarberReturnType {
    success: boolean; 
    message?: string; 
    data?: SingleBarberReturnType;
    actionDone?: string;
}
export interface ReturnForgotPasswordType extends BasicApiReturnType {
    data?: ForgotPasswordType;
 }
