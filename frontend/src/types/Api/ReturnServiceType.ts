export interface SingleServiceType {
    id: number;
    userId: number;
    userService: string;
    price: string;
    description: string;
}
export interface ManageServiceReturnType {
    success: boolean;
    message?: string;
    data?: SingleServiceType;
    actionDone?: string;
}