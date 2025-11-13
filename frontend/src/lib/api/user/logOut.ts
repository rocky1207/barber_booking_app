import api from '@/lib/axios';
import { BasicApiReturnType } from '@/types/Api/ApiReturnType';
export const logOut = async (url: string, data: {}): Promise<BasicApiReturnType> => {
    let answer;
    try {
        const response = await api.post(url, data);
        if(response.data.status === 200) {
            answer = {
                success: true, 
                message: response.data.message, 
                actionDone: 'LOGOUT_BARBER'
            };
        } else {
          throw new Error(response.data.message || 'Greška prilikom izvršenja upita.'); 
        }
        
    } catch(error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
}