import { WorkingHoursWithUserApiReturnType, WorkingHoursFormData } from '@/types/WorkingHours/WorkingHoursType';
import { GetServicesReturnType } from '@/types/Api/ReturnServiceType';
import { GetBarberAppointmentsReturnDataType, GetReservedAppointmentsReturnDataType } from '@/types/Api/ReturnAppointmentType';
import { ReturnReservedDatesType } from '@/types/Api/ReturnReservedDatesType';
import api from '@/lib/axios';
import { apiRoutes } from './apiRoutes/apiRoutes';

type PromiseReturnDataType =
    GetServicesReturnType | 
    GetReservedAppointmentsReturnDataType | 
    GetBarberAppointmentsReturnDataType | 
    WorkingHoursWithUserApiReturnType | 
    WorkingHoursFormData |
    ReturnReservedDatesType;

export const getItemsByUserId = async (data: {userId: number, date: string}, action: string): Promise<PromiseReturnDataType> => {
    const {userId, date} = data;
    let url: string = '';
    let answer;
    let apiRequest;
    const actionDone: string = action;
    if(action === 'GET_USER_SERVICES') {
        url = apiRoutes.GET_USER_SERVICES;
        apiRequest = api.get(url, {params: {id: userId}});
    };
    if(action === 'GET_BARBER_APPOINTMENTS' || action === 'GET_RESERVED_APPOINTMENTS') {
        const updatedData = {...data, action};
        console.log(updatedData);
        url = apiRoutes.GET_RESERVED_AND_BARBER_APPOINTMENTS;
        apiRequest = api.post(url, updatedData);
    };
    
    if(action === 'GET_WORKING_HOURS_BY_USER_ID') {
        url = `${apiRoutes.GET_WORKING_HOURS_BY_USER_ID}?userId=${userId}`;
        apiRequest = api.get(url, {params: {id: userId}});
    };
    if(action === 'GET_WORKING_HOURS_FOR_DATE') {
        url = `${apiRoutes.GET_WORKING_HOURS_FOR_DATE}?userId=${userId}&date=${date}`;
        apiRequest = api.get(url);
    };
    if(action === 'GET_RESERVED_DATES') {
        url = `${apiRoutes.GET_RESERVED_DATES}?userId=${userId}}`;
        apiRequest = api.get(url);
    };
    try {
        const response = await apiRequest;
        if(response?.status === 200) {
            if(action === 'GET_USER_SERVICES') {
                if(response.data.data.length === 0) answer = {
                success: true, 
                message: 'Nema unetih usluga za ovog frizera.'
            }
            }
            answer = {
                success: true, 
                data: response.data.data, 
                message: response.data.message,
                actionDone
            };
        } else {
            throw new Error(response?.data.message || 'Nepoznata greška');
        }
    } catch (error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;   
};