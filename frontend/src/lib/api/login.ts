import api from "../axios";
import { LoginReturnType } from "@/types/Api/LoginReturnType";
export const login = async (url: string, data: Record<string, string>): Promise<LoginReturnType> => {
    try {
        const response = await api.post(url, data);
        return {success: true, data: response.data};
      } catch(error: any) {
        console.log(error);
        return {success: false, message: error.message};
    }
};