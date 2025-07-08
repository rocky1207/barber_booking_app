import api from '@/lib/axios';
import { BasicReturnDataType } from '@/types/Api/ReturnType';
export const logOut = async (url: string, data: {}): Promise<BasicReturnDataType> => {
    let answer;
    try {
        const response = await api.post(url, data);
        answer = {success: true, status: response.status, message: response.data.message};
    } catch(error: any) {
        answer = {success: false, status: error.status, message: error.message};
    }
    return answer;
}