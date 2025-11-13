/*
import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { GetBarberAppointmentsReturnDataType } from "@/types/Api/ReturnAppointmentType";

export const getBarberAppointments = async (data: {userId: number, date: string}): Promise<GetBarberAppointmentsReturnDataType> => {
    console.log(data);
    const updatedData = {...data, action: 'BARBER_APPOINTMENTS'};
    let answer;
    try {
        const response = await api.post(apiRoutes.GET_RESERVED_AND_BARBER_APPOINTMENTS, updatedData);
        if(response.data.status === 200) {
            answer = {
                success: true, 
                data: response.data.data,
                message: response.data.message,
                actionDone: 'GET_BARBER_APPOINTMENTS'
            };
        } else {
            throw new Error(response.data.message || 'Greška prilikom izvršenja upita');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
};
*/