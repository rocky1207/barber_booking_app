/*
import api from "@/lib/axios";
import { DeleteClientAppointmentReturnDataType } from "@/types/Api/ReturnAppointmentType";
export const deleteClientAppointment = async (url: string, id: number): Promise<DeleteClientAppointmentReturnDataType> => {
    let answer;
    try {
        const response = await api.delete(url, {data: {id}});
        console.log(response);
        if(response.status === 200) {
            answer = {
                success: true, 
                actionDone: 'DELETE',
                data: response.data.data, 
                message: response.data.data.message};
        } else {
            throw new Error(response?.data?.message || 'Greška na serveru.');
        }
    } catch(error: any) {
        answer = {success: false, message: error.message};
    }
    return answer;
}
    */