import { BasicApiReturnType } from "./ApiReturnType";

export interface SingleServiceType {
    id: number;
    userId: number;
    userService: string;
    price: string;
    description: string;
}
export interface InsertUpdateServiceReturnType extends BasicApiReturnType {
    data: SingleServiceType;
}
export interface GetServicesReturnType extends BasicApiReturnType {
    data?: SingleServiceType[];
}