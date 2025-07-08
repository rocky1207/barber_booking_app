import api from "../../axios";
import { ManageBarberReturnType } from "@/types/Api/ReturnType";
export const loginRegisterUpdate = async (url: string, data: Record<string, string>, apiAction: 'POST' | 'PATCH'): Promise<ManageBarberReturnType> => {
  let apiRequest;
  if(apiAction === 'POST') apiRequest = api.post(url, data);
  if(apiAction === 'PATCH') apiRequest = api.patch(url, data);
  let answer;  
  try {
        const response = await apiRequest;
        answer = {success: true, data: response?.data};
      } catch(error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
};