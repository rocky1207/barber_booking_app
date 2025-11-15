import { BasicBarberType } from "../Barbers/BarbersType";
import { BasicApiReturnType } from "./ApiReturnType";
import { ForgotPasswordType } from "../Barbers/BarbersType";
/*
export interface BasicReturnDataType {
    success: boolean;
    status: number;
    message: string;
}
    */
   /*
export interface LoginBarberReturnType extends BasicBarberType {
    data?: BasicBarberType;
}
    */
export interface SingleBarberReturnType extends BasicApiReturnType {
    data: BasicBarberType;
}
export interface MultiBarberReturnType extends BasicApiReturnType {
    data: BasicBarberType[];
}
/*
export interface DeleteBarberReturnType {
    success: boolean; 
    message?: string; 
    data?: SingleBarberReturnType;
    actionDone?: string;
}

*/
export interface ManageBarberReturnType extends BasicApiReturnType {
    data?: SingleBarberReturnType;
}
export interface DeleteBarberReturnType {
    success: boolean; 
    message?: string; 
    data?: SingleBarberReturnType;
    actionDone?: string;
}
export interface ReturnForgotPasswordType extends BasicApiReturnType {
    data?:ForgotPasswordType;
  //  actionDone?: string;
}
