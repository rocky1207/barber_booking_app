import api from "../axios";
import { apiRoutes } from "./apiRoutes/apiRoutes";
import { BasicServiceType } from "@/types/Services/ServicesType";
import { InsertUpdateServiceReturnType } from "@/types/Api/ReturnServiceType";
import { InsertAppointmentApiReturnType } from "@/types/Appointments/AppointmentsType";
import { InsertUpdateWorkingHoursApiReturnType } from "@/types/WorkingHours/WorkingHoursType";
import { BasicAppointmentsType } from "@/types/Appointments/AppointmentsType";
import { WorkingHoursDataType } from "@/types/WorkingHours/WorkingHoursType";

type InsertDataType = 
    BasicServiceType |
    BasicAppointmentsType |
    WorkingHoursDataType;
type PromiseReturnApiType = 
   InsertUpdateServiceReturnType |
    InsertAppointmentApiReturnType |
    InsertUpdateWorkingHoursApiReturnType;
export const insertItems = async (data: InsertDataType, action: string): Promise<PromiseReturnApiType> => {
    let answer;
    let url: string = '';
    const actionDone = action;
    if(action === 'INSERT_SERVICE') {
        url = apiRoutes.INSERT_SERVICE;
    }
    if(action === 'INSERT_CLIENT_APPOINTMENT') {
        url = apiRoutes.INSERT_APPOINTMENT;
    }
    if(action === 'INSERT_WORKING_HOURS') {
        url = apiRoutes.INSERT_WORKING_HOURS;
    }
    try {
        let response;
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
};