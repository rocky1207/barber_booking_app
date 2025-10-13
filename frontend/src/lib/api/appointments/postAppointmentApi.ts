import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { BasicAppointmentsType } from "@/types/Appointments/AppointmentsType";
import { InsertAppointmentReturnData } from "@/types/Api/ReturnAppointmentType";
import { ClientAppointmentsType } from "@/types/Appointments/AppointmentsType";
import { GetClientAppointmentsReturnData } from "@/types/Api/ReturnAppointmentType";
export const postAppointmentApi = async (action: string, data: BasicAppointmentsType | ClientAppointmentsType): Promise<InsertAppointmentReturnData | GetClientAppointmentsReturnData> => {
    let answer: InsertAppointmentReturnData;
    let actionDone: string = '';
    let route: string = '';
    try {
        let response;
        
        if(action === 'INSERT') {
            route = apiRoutes.INSERT_APPOINTMENT;
            actionDone = 'INSERT';
        }
        if(action === 'GET_CLIENT_APPOINTMENTS') {
            route = apiRoutes.GET_CLIENT_APPOINTMENTS;
            actionDone = 'GET_CLIENT_APPOINTMENTS';
        }
        /*
    if(action === 'INSERT') {
        response = await api.post(apiRoutes.INSERT_APPOINTMENT, data);
        actionDone = 'INSERT';
        console.log(response);
    }
    */
    response = await api.post(route, data);
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