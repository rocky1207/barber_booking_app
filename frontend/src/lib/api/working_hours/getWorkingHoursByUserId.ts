/*
import { WorkingHoursApiResponse, WorkingHoursFormData } from '@/types/WorkingHours/WorkingHoursType';
import api from '@/lib/axios';
import { apiRoutes } from '../apiRoutes/apiRoutes';

export const getWorkingHoursByUserId = async (userId: number): Promise<WorkingHoursApiResponse> => {
    let answer;
    try {
        const response = await api.get(`${apiRoutes.GET_WORKING_HOURS_BY_USER_ID}?userId=${userId}`, {params: {id: userId}});
        console.log(response);
        if(response.status === 200) {
            answer = {
                success: true, 
                data: response.data.data, 
                message: response.data.message,
                actionDone: 'GET_WORKING_HOURS'
            };
        } else {
            throw new Error(response.data.message || 'Nepoznata greška');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
        
    return answer;   

    };
    */