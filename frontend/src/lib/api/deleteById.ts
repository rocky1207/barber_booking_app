import api from "@/lib/axios";
import { apiRoutes } from "./apiRoutes/apiRoutes";
import { DeleteReturnType } from "@/types/Api/ApiReturnType";

export const deleteById = async (action: string, id: number): Promise<DeleteReturnType> => {
   let answer;
    let actionDone = action.toUpperCase();
    let url = '';
    if(action === 'DELETE_BARBER') {
       url = apiRoutes.DELETE_USER;
       // actionDone = 'DELETE_BARBER';
    }
    if(action === 'DELETE_SERVICE') {
        console.log('ušlo');
        url = apiRoutes.DELETE_SERVICE;
       // actionDone = 'DELETE_SERVICE';
    }
    if(action === 'DELETE_CLIENT_APPOINTMENT' || action === 'DELETE_BARBER_APPOINTMENT') {
        console.log('delete apppointment');
        url = apiRoutes.DELETE_CLIENT_APPOINTMENT;
       // actionDone = 'DELETE_APPOINTMENT';
    }
    if(action === 'DELETE_WORKING_HOURS_BY_ID') {
        url = apiRoutes.DELETE_WORKING_HOURS_BY_ID;
       // actionDone ='DELETE_WORKING_HOURS_BY_ID'
    } 
            console.log(url);
            console.log(action);

    try {
        const response = await api.delete(url, {data: id});
        console.log(response);
        if(response.data.status === 200) {
            answer = {
                success: true,
                data: response.data.data,
                message: response.data.message,
                actionDone
            };
        } else {
            throw new Error(response.data.message || 'Greška prilikom izvršenja upita.')
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
        console.log(answer);
    return answer;
    };
