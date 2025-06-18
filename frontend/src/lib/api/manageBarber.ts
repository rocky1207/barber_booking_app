import api from '@/lib/axios';
import { ReturnType } from '@/types/Api/ReturnType';

export const manageBarber = async (url: string, id: string): Promise<ReturnType> => {
    const parsedId = parseInt(id);
    let answer: ReturnType;
    try {
        let response;
        if(url==='/getClients.php') {
        response = await api.get(url, {params: {id: parsedId}});
        }else if(url==='user/updateUser.php'){
            response = await api.patch(url, {id: parsedId});
        }else if(url==='user/deleteUser.php') {
            response = await api.delete(url, {data: {id:parsedId}});
        }
        
        console.log(response);
        answer = {success: true, data: response?.data};
    } catch(error: any) {
        answer = {success: false, message: error?.message};
    }
    return answer;

};