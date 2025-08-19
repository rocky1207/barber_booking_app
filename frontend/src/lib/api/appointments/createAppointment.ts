import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { BasicAppointmentsType } from "@/types/Appointments/AppointmentsType"
export const createAppointment = (action: string, data: BasicAppointmentsType) => {
    console.log(action);
    console.log(data);
    let actionDone: string;
    
    try {
        let response;
    if(action === 'INSERT') {
        response = api.post(apiRoutes.INSERT_APPOINTMENT, data);
        console.log(response);
        
    }
    } catch(error: any) {
        console.log(error);
    }
}