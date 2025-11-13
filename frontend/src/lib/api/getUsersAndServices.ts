import api from "@/lib/axios";
import { apiRoutes } from "./apiRoutes/apiRoutes";
import { GetServicesReturnType } from "@/types/Api/ReturnServiceType";
import { MultiBarberReturnType } from "@/types/Api/ReturnBarberType";
export const getUsersAndServices = async (action: string): Promise<MultiBarberReturnType | GetServicesReturnType> => {
    let answer;
    let url: string = '';
    const actionDone = action;
    let backupMessage = '';
    if(action ==='GET_ALL_BARBERS') {
        url = apiRoutes.GET_USERS;
        backupMessage = 'Nema raspoloživih frizera.';
    }
    if(action ==='GET_ALL_SERVICES') {
        url = apiRoutes.GET_ALL_SERVICES;
        backupMessage = 'Nema nijedne unete usluge.';
    }
    try {
        const response = await api.get(url);
        if(response.status === 200) {
            if(response.data.length === 0) answer = {
                success: true, 
                data: [], 
                message: response.data.message || backupMessage,
                actionDone
            };
            answer = {
                success: response.data.success,
                data: response.data.data,
                message: response.data.message,
                actionDone
            }
        } else {
            throw new Error(response.data.message || 'Nepoznata greška.');
        }
    } catch(error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
}