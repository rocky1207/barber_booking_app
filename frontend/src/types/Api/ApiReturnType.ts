export interface BasicApiReturnType {
    success: boolean;
    message: string;
    actionDone?: string;
}

export interface DeleteReturnType extends BasicApiReturnType {
    data?: {id: number;};
}