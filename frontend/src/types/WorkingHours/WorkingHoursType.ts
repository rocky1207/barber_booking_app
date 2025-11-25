import { BasicApiReturnType } from "../Api/ApiReturnType";
export interface WorkingHoursType {
    id: number;
    userId: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    created_at?: string;
    updated_at?: string;
}
export interface WorkingHoursDataType {
    userId: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
}
export interface WorkingHoursSliceType {
    userWorkingHours: WorkingHoursType[];
    actionWorkingHoursId: number;
}
export interface WorkingHoursWithUserType extends WorkingHoursType {
    username: string;
}

export interface WorkingHoursFormData {
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
}

export interface WorkingHoursApiReturnType extends BasicApiReturnType {
    data?: WorkingHoursType[];
}
export interface InsertUpdateWorkingHoursApiReturnType extends BasicApiReturnType {
    data?: WorkingHoursType;
}
    
export interface WorkingHoursWithUserApiReturnType extends BasicApiReturnType {
    data: WorkingHoursWithUserType;
}





