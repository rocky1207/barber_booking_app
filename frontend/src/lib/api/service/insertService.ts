import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
interface Service {
    userId: number;
    service: string;
    price: number;
    description: string;
}
export const insertService = async (action: string, data: Service): Promise<void> => {
    console.log(action, data);
    let response;
    let actionDone;
    if(action === 'INSERT') {
        response = await api.post(apiRoutes.INSERT_SERVICE, data);
        console.log(response);
        actionDone = 'INSERTED';
    }
    /*
    try {
        const response = await api.post(url, data);
        console.log(response);
    } catch(error: any) {
        console.log(error);
    }
        */
}