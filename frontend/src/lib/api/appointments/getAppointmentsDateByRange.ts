import { GetReservedAppointmentsReturnDataType } from '@/types/Api/ReturnAppointmentType';
import api from '@/lib/axios';
import { apiRoutes } from '../apiRoutes/apiRoutes';

export const getAppointmentsDatesByRange = async (data: {userId: number, date?: string, startDate?: string, endDate?: string}): Promise<GetReservedAppointmentsReturnDataType> => {
    const {userId, startDate, endDate} = data;
    let url: string = '';
    let answer;
    let apiRequest;
    
    url = apiRoutes.GET_APPOINTMENT_DATES_BY_RANGE;
    apiRequest = api.post(url, { userId, startDate, endDate });
    try {
        const response = await apiRequest;
        if(response.status === 200) {
            answer = {
                success: true, 
                data: response.data.data, 
                message: response.data.message,
                actionDone: 'GET_APPOINTMENT_DATES_BY_RANGE'
            };
        } else {
            throw new Error(response?.data.message || 'Nepoznata greška');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;   
};