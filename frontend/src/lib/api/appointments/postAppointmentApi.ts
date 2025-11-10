import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { BasicAppointmentsType } from "@/types/Appointments/AppointmentsType";
import { InsertAppointmentReturnData } from "@/types/Api/ReturnAppointmentType";
import { ClientAppointmentsType } from "@/types/Appointments/AppointmentsType";
import { GetClientAppointmentsReturnData } from "@/types/Api/ReturnAppointmentType";
export const postAppointmentApi = async (action: string, data: BasicAppointmentsType | ClientAppointmentsType | number): Promise<InsertAppointmentReturnData | GetClientAppointmentsReturnData> => {
    let answer: InsertAppointmentReturnData;
    let actionDone: string = '';
    let url: string = '';
    try {
        let response;
        if(action === 'INSERT_CLIENT_APPOINTMNET') {
            url = apiRoutes.INSERT_APPOINTMENT;
            actionDone = 'INSERT_CLIENT_APPOINTMNET';
        }
        if(action === 'GET_CLIENT_APPOINTMENTS') {
            url = apiRoutes.GET_CLIENT_APPOINTMENTS;
            actionDone = 'GET_CLIENT_APPOINTMENTS';
        }
        response = await api.post(url, data);
        if(response.status === 200) {
            answer = {
                success: true, 
                data: response.data.data, 
                message: response.data.message, 
                actionDone};
        } else {
            throw new Error(response?.data?.message || 'Greška na serveru.');
            }
    } catch(error: any) {
        answer = {success: false, message: error?.message};
    }
    return answer;
}