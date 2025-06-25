import { BasicBarberType } from "../Barbers/BarbersType";
export interface ManageBarberReturnType {
    success: boolean; 
    message?: string; 
    data?: BasicBarberType;
    actionDone?: string;
}