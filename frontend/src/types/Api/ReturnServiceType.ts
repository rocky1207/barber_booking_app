export interface BasicServicesDataReturnType {
    success: boolean;
    message?: string;
    actionDone?: string;
}
export interface SingleServiceType {
    id: number;
    userId: number;
    userService: string;
    price: string;
    description: string;
}
export interface ManageServiceReturnType extends BasicServicesDataReturnType {
    data?: SingleServiceType;
}
export interface GetServicesReturnType extends BasicServicesDataReturnType {
    data?: SingleServiceType[];
}