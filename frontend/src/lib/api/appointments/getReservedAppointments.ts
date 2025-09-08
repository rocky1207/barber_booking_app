import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
export const getReservedAppointments = async (date: string) => {
    console.log(apiRoutes.GET_RESERVED_APPOINTMENTS);
    try {
        const response = await api.get(apiRoutes.GET_RESERVED_APPOINTMENTS, {params: {date}});
       console.log(response);
    } catch (error: any) {
        console.log(error);
    }

};