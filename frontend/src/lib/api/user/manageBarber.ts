import api from '@/lib/axios';
import { ManageBarberReturnType } from '@/types/Api/ReturnType';

export const manageBarber = async (url: string, id: number): Promise<ManageBarberReturnType> => {
    let answer: ManageBarberReturnType;
    let actionDone: string = '';
    try {
        let response;
        if(url==='user/getClients.php') {
            response = await api.get(url, {params: {id}});
            actionDone = 'get_client';
        }else if(url==='user/updateUser.php'){
            response = await api.patch(url, {id});
            actionDone = 'update';
        }else if(url==='user/deleteUser.php') {
            response = await api.delete(url, {data: {id}});
            actionDone = 'delete';
        }
        
        console.log(response);
        if(response?.data?.success) {
            answer = {success: true, data: response?.data?.data || response?.data?.message, actionDone};
        } else {
            answer = {success: false, message: response?.data?.message || 'Greška na serveru.'};
        }
        
    } catch(error: any) {
        answer = {success: false, message: error?.message};
    }
    return answer;

};