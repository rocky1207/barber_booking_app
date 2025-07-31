import api from "../axios";
import { ManageBarberReturnType } from "@/types/Api/ReturnType";
export const loginRegisterUpdate = async (url: string, data: Record<string, string>, apiAction: 'POST' | 'PATCH'): Promise<ManageBarberReturnType> => {
  let apiRequest;
  if(apiAction === 'POST') apiRequest = api.post(url, data);
  if(apiAction === 'PATCH') apiRequest = api.patch(url, data);
  let answer;  
  try {
        const response = await apiRequest;
        console.log(response?.data);
        if(response?.data?.success) {
          answer = {success: true, data: response?.data, message: response?.data.message};
        } else {
          answer = {success: false, message: response?.data.message || 'Greška prilikom izvršenja upita'};
        }
      } catch(error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
};