export interface BasicApiReturnType {
    success: boolean;
    message: string;
}

export interface DeleteReturnType extends BasicApiReturnType {
     
    data?: {id: number;};
    actionDone?: string;
}