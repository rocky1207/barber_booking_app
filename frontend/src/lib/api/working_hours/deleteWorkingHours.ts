import api from "@/lib/axios";
import { WorkingHoursApiResponse } from "@/types/WorkingHours/WorkingHoursType";
import { apiRoutes } from "../apiRoutes/apiRoutes";

export const deleteWorkingHours = async (url: string, id: number): Promise<any> => {
    let answer;
    try {
        const response = await api.delete(url, {data: id});
        console.log(response);
        if(response.data.status === 200) {
            answer = {
                success: true,
                data: response.data.data,
                message: response.data.message,
                actionDone: 'DELETE_WORKING_HOURS_BY_ID'
            };
        } else {
            throw new Error(response.data.message || 'Greška prilikom izvršenja upita.')
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
        console.log(answer);
    return answer;
    };