import { WorkingHoursApiResponse, WorkingHoursFormData } from '@/types/WorkingHours/WorkingHoursType';
import api from '@/lib/axios';
import { apiRoutes } from '../apiRoutes/apiRoutes';
export const insertUpdateWorkingHours = async (data: WorkingHoursFormData, apiAction: 'POST' | 'PUT'): Promise<WorkingHoursApiResponse> => {
    console.log(data);
    let actionDone: string = '';
    let url: string = '';
    let apiRequest;
    if(apiAction === 'POST') {
        url = apiRoutes.INSERT_WORKING_HOURS;
        apiRequest = api.post(url, data);
        actionDone = 'INSERT_WORKING_HOURS';
    };
    if(apiAction === 'PUT') {
        url = apiRoutes.UPDATE_WORKING_HOURS;
        apiRequest = api.put(url, data);
        actionDone = 'UPDATE_WORKING_HOURS';
    };
    let answer;
    try {
        const response = await apiRequest;
        console.log(response);
        if(response?.data.status === 200) {
            answer = {
                success: true,
                data: response.data.data,
                message: response.data.message,
                actionDone
            };
        } else {
            throw new Error(response?.data.message || 'Greška prilikomn izvršenja upita');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
        
    return answer
    };