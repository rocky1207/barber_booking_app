import api from '@/lib/axios';
import { DeleteBarberReturnType } from '@/types/Api/ReturnBarberType';
import { DeleteReturnType } from '@/types/Api/ApiReturnType';

export const deleteBarber = async (url: string, id: number): Promise<DeleteReturnType> => {
    let answer: DeleteReturnType;
    let actionDone: string = '';
    try {
        let response;
        /*if(url==='user/getClients.php') {
            response = await api.get(url, {params: {id}});
            actionDone = 'get_client';
        }else */
        if(url==='user/deleteUser.php') {
            response = await api.delete(url, {data: {id}});
            actionDone = 'DELETE';
        }
        if(response?.data?.success) {
            answer = {success: true, data: response?.data?.data, message: response?.data?.message, actionDone};
        } else {
            // answer = {success: false, message: response?.data?.message || 'Greška na serveru.'};
            throw new Error(response?.data?.message || 'Greška na serveru.');
        }
        
    } catch(error: any) {
        answer = {success: false, message: error?.message};
    }
    return answer;

};