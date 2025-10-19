import api from "@/lib/axios"
export const deleteClientAppointment = async (url: string, id: number): Promise<any> => {
    console.log(url, id);
    
    let answer;
    try {
        const response = await api.delete(url, {data: {id}});
        console.log(response);
        if(response.data.success) {
            answer = {success: true, actionDone: 'DELETE', data: response.data.data, message: response.data.data.message};
        } else {
            throw new Error(response?.data?.message || 'Greška na serveru.');
        }
    } catch(error: any) {
        console.log(error);
        answer = {success: false, message: error.message};
    }
    return answer;
}