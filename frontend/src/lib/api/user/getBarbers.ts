import api from "../../axios";
import { MultiBarberReturnType } from "@/types/Api/ReturnType";
export const getBarbers = async (url: string): Promise<{success: boolean; data?: MultiBarberReturnType; message?: string }> => {
    let data:{success: boolean; data?: MultiBarberReturnType; message?: string };
    try {
        const response = await api.get(url);
        if(response.data.length === 0) data = {success: true, message: 'Trenutno nema raspoloživih frizera.'};
        data = {success: true, data: response.data};
    } catch(error: any) {
        data = {success: false, message: error.message};
    }
    return data;
 }