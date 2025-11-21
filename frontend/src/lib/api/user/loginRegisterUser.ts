import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { RegisterUpdateBarberReturnType } from "@/types/Api/ReturnBarberType";

export const loginRegisterUser = async (data: Record<string, string | number>, action: string): Promise<RegisterUpdateBarberReturnType> => {
  let answer;
  let url: string = '';
  const actionDone = action;
  let apiRequest;
  if(action === 'LOGIN_BARBER') {
     url = apiRoutes.LOGIN_USER;
     apiRequest = api.post(url, data);
  } 
  if(action === 'REGISTER_BARBER') {
    url = apiRoutes.REGISTER_USER;
    apiRequest = api.post(url, data);
  }
  if(action === 'RESET_PASSWORD') {
    url = apiRoutes.RESET_PASSWORD;
    apiRequest = api.patch(url, data);
  }
  try {
        const response = await apiRequest;
        if(response?.data.status === 200) {
          answer = {
            success: true, 
            data: response.data.data, 
            message: response.data.message,
            actionDone
        };
        } else {
          answer = {success: false, message: response?.data.message || 'Greška prilikom izvršenja upita'};
        }
      } catch(error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
};