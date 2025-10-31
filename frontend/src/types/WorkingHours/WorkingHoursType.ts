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

export interface WorkingHoursApiResponse {
    success: boolean;
    status: number;
    message: string;
    data?: WorkingHoursType | WorkingHoursType[] | WorkingHoursWithUserType[];
}


