import { BasicBarberType } from "../Barbers/BarbersType";
export interface DataType {
    success: boolean;
    status: number;
    message: string;
    data: BasicBarberType;
}
export interface ManageBarberReturnType {
    success: boolean; 
    message?: string; 
    data?: DataType;
    actionDone?: string;
}