import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { BasicAppointmentsType } from "@/types/Appointments/AppointmentsType";
import { InsertAppointmentReturnData } from "@/types/Api/ReturnAppointmentType";
export const createAppointment = async (action: string, data: BasicAppointmentsType): Promise<InsertAppointmentReturnData> => {
    let answer: InsertAppointmentReturnData;
    let actionDone: string = '';
    try {
        let response;
    if(action === 'INSERT') {
        response = await api.post(apiRoutes.INSERT_APPOINTMENT, data);
        actionDone = 'INSERT';
        console.log(response);
    }
    if(response?.data?.success) {
        answer = {success: true, data: response.data.data, message: response.data.message, actionDone};
    } else {
        throw new Error(response?.data?.message || 'Greška na serveru.');
        }
    } catch(error: any) {
        answer = {success: false, message: error?.message};
    }
    return answer;
}