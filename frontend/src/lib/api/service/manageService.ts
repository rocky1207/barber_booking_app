import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { ManageBarberReturnType } from "@/types/Api/ReturnType";
import { GetServicesReturnType } from "@/types/Api/ReturnServiceType";

export const manageService = async (url: string, id: number): Promise<ManageBarberReturnType> => {
    console.log('manageService');
    let answer;
    let actionDone: string = '';
    try {
        let response;
        /*
        if(url === 'service/getAllServices.php') {
            response = await api.get('url...');
            actionDone = 'GET_ALL_CLIENTS';
        }
            */
        if(url === 'service/deleteService.php') {
            response = await api.delete(apiRoutes.DELETE_SERVICE, {data:{id}});
            actionDone = 'DELETE';
        }
        
        if(response?.data?.success) {
            answer = {success: true, data: response?.data?.data, actionDone};
        } else {
            throw new Error(response?.data?.message || 'Greška na serveru.');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message}
    }
    return answer;
};