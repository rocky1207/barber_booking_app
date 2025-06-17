import api from "../axios";
import { ReturnType } from "@/types/Api/ReturnType";
export const login = async (url: string, data: Record<string, string>): Promise<ReturnType> => {
  let answer;  
  try {
        const response = await api.post(url, data);
        answer = {success: true, data: response.data};
      } catch(error: any) {
        console.log(error);
        answer = {success: false, message: error.message};
    }
    return answer;
};