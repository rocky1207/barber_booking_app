import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
import { SingleBarberReturnType } from "@/types/Api/ReturnBarberType";

export const loginRegisterUser = async (data: Record<string, string | number>, action: string): Promise<SingleBarberReturnType> => {
  let answer;
  let url: string = '';
  const actionDone = action;
  if(action === 'LOGIN_BARBER') {
     url = apiRoutes.LOGIN_USER;
  } 
  if(action === 'REGISTER_BARBER') {
    url = apiRoutes.REGISTER_USER;
  }
  try {
        const response = await api.post(url, data);;
        if(response.data.status === 200) {
          answer = {
            success: true, 
            data: response.data.data, 
            message: response.data.message,
            actionDone
        };
        } else {
          answer = {success: false, message: response.data.message || 'Greška prilikom izvršenja upita'};
        }
      } catch(error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
};