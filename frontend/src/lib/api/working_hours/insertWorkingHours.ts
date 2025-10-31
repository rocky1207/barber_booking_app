import { WorkingHoursApiResponse, WorkingHoursFormData } from '@/types/WorkingHours/WorkingHoursType';
import api from '@/lib/axios';
import { apiRoutes } from '../apiRoutes/apiRoutes';
export const insertWorkingHours = async (data: WorkingHoursFormData & { userId: number }): Promise<any> => {
    console.log(data);
    let answer;
    try {
        const response = await api.post(apiRoutes.INSERT_WORKING_HOURS, data);
        console.log(response);
        if(response.data.status === 200) {
            answer = {
                success: true,
                data: response.data.data,
                message: response.data.message,
                actionDone: 'INSERT_WORKING_HOURS'
            };
        } else {
            throw new Error(response.data.message || 'Greška prilikomn izvršenja upita');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
        
    return answer
    };