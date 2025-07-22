import api from "@/lib/axios";
import { GetServicesReturnType } from "@/types/Api/ReturnServiceType";
export const getAllServices = async (url: string): Promise<GetServicesReturnType> => {
    let answer;
    console.log(url);
    try {
        
        const response = await api.get(url);
        console.log(response.data.data);
        if(response.status) {
            if(response.data.length === 0) answer = {success: true,message: response.data.message || 'Nema nijedne unete usluge.'};
            answer = {
                success: response.data.success,
                data: response.data.data,
                actionDone: 'GET_USER_SERVICES'
            }
        } else {
            throw new Error(response.data.message || 'Nepoznata greška.');
        }
    } catch(error: any) {
        console.log(error.message);
        answer = {success: false, message: error.message};
    }
    return answer;
}