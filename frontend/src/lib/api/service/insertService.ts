import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { SingleServiceType, ManageServiceReturnType } from "@/types/Api/ReturnServiceType";
import { BasicServiceType } from "@/types/Services/ServicesType";

export const insertService = async (action: string, data: BasicServiceType): Promise<ManageServiceReturnType> => {
    let answer: ManageServiceReturnType;
    let actionDone: string = '';
    try {
        let response;
        if(action === 'INSERT') {
            response = await api.post(apiRoutes.INSERT_SERVICE, data);
            actionDone = 'INSERT';
            console.log(response);
        }
        if(response?.data?.success) {
             const service: SingleServiceType = response.data.data.data; 
             console.log(service);
            //const message = response?.message;
            answer = {success: true, data: service, message: response?.data.message, actionDone};
        } else {
           // answer = {success: false, data: response?.data?.message  || 'Greška na serveru.'};
            throw new Error(response?.data?.message  || 'Greška na serveru.');
        }
    } catch(error: any) {
        answer = {success: false, message: error?.message};
    }
    return answer;
}