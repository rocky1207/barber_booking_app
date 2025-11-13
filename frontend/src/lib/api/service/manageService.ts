/*
import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { DeleteBarberReturnType } from "@/types/Api/ReturnBarberType";
import { GetServicesReturnType } from "@/types/Api/ReturnServiceType";

export const manageService = async (url: string, id: number): Promise<DeleteBarberReturnType> => {
    console.log('manageService');
    let answer;
    let actionDone: string = '';
    try {
        const response = await api.delete(apiRoutes.DELETE_SERVICE, {data:{id}});
        actionDone = 'DELETE';
        if(response.status === 200) {
            answer = {
                success: true, 
                data: response?.data?.data,
                message: response.data.message, 
                actionDone
            };
        } else {
            throw new Error(response?.data?.message || 'Greška na serveru.');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message}
    }
    return answer;
};
*/