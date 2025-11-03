import api from "@/lib/axios";
import { WorkingHoursApiResponse } from "@/types/WorkingHours/WorkingHoursType";
import { apiRoutes } from "../apiRoutes/apiRoutes";
export const getWorkingHoursForDate = async (userId: number, date: string): Promise<any> => {
    let answer;
    try {
        const response = await api.get(`${apiRoutes.GET_WORKING_HOURS_FOR_DATE}?userId=${userId}&date=${date}`);
        if(response.data.status === 200) {
            answer = {
                success: true,
                message: response.data.message,
                data: response.data.data,
                actionDone: 'GET_WORKING_HOURS_FOR_DATE'
            };
        } else {
            throw new Error(response.data.message || 'Greška prilikom izvršenja upita');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
    };