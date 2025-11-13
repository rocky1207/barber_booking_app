/*
import api from "@/lib/axios";
import { GetServicesReturnType } from "@/types/Api/ReturnServiceType";
export const getUserServices = async (url: string, id: number): Promise<GetServicesReturnType> => {
    console.log(url, id);
    let answer;
    try {
        const response = await api.get(url, {params: {id}});
        if(response.status === 200) { 
            if(response.data.data.length === 0) answer = {
                success: true, 
                message: 'Nema unetih usluga za ovog frizera.'
            }
            answer = {
                success: true, 
                data: response.data.data,
                actionDone: 'GET_USER_SERVICES',
                message: response.data.message
            } 
        } else {
            throw new Error(response?.data.message || 'Nepoznata greška');
        }
    } catch(error: any) {
        answer = {success: false, message: error.message}
    }
    return answer;
} 
    */