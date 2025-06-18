import api from '@/lib/axios';
import { ReturnType } from '@/types/Api/ReturnType';
export const logOut = async (url: string, data: {}): Promise<ReturnType> => {
    let answer;
    try {
        const respone = await api.post(url, data);
        answer = {success: true, data: respone.data};
    } catch(error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
}