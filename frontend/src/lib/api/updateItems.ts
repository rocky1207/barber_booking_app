import { WorkingHoursFormData } from '@/types/WorkingHours/WorkingHoursType';
import { InsertUpdateServiceReturnType } from '@/types/Api/ReturnServiceType';
import { SingleBarberReturnType } from '@/types/Api/ReturnBarberType';
import { WorkingHoursApiReturnType } from '@/types/WorkingHours/WorkingHoursType';
import { UpdateServiceDataType } from '@/types/Services/ServicesType';
import { UpdateBarberDataType } from '@/types/Barbers/BarbersType';
import api from '@/lib/axios';
import { apiRoutes } from './apiRoutes/apiRoutes';

type UpdateDataType = 
    UpdateBarberDataType |
    UpdateServiceDataType |
    WorkingHoursFormData;
type UpdatePromiseType = 
    SingleBarberReturnType |
    InsertUpdateServiceReturnType |
    WorkingHoursApiReturnType;
export const updateItems = async (data: UpdateDataType, action: string): Promise<UpdatePromiseType> => {
    let url: string = '';
    let apiRequest;
    const actionDone: string = action;
    if(action === 'UPDATE_BARBER') {
        url = apiRoutes.UPDATE_USER;
        apiRequest = api.patch(url, data);
     
    };
    if(action === 'UPDATE_SERVICE') {
        url = apiRoutes.UPDATE_SERVICE;
        apiRequest = api.patch(url, data);
     
    };
    if(action === 'UPDATE_WORKING_HOURS') {
        url = apiRoutes.UPDATE_WORKING_HOURS;
        apiRequest = api.put(url, data);
        
    };
    let answer;
    try {
        const response = await apiRequest;
        console.log(response);
        if(response?.data.status === 200) {
            answer = {
                success: true,
                data: response.data.data,
                message: response.data.message,
                actionDone
            };
        } else {
            throw new Error(response?.data.message || 'Greška prilikomn izvršenja upita');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
        
    return answer
    };
    