import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { GetReservedAppointmentsReturnData } from "@/types/Api/ReturnAppointmentType";
export const getReservedAppointments = async (data: {userId: number, date: string}): Promise<GetReservedAppointmentsReturnData> => {
    let answer;
    try {
        const response = await api.get(apiRoutes.GET_RESERVED_APPOINTMENTS, {params: data});
        if(response.data.status === 200) {
            answer = {
                success: true, 
                data: response.data.data,
                message: response.data.message,
                actionDone: 'GET_RESERVED_APPOINTMENTS'
            };
        } else {
            throw new Error(response.data.message || 'Greška prilikom izvršenja upita');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
        
};