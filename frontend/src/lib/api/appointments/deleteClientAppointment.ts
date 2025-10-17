import api from "@/lib/axios"
export const deleteClientAppointment = async (url: string, id: number): Promise<any> => {
    console.log(url, id);
    
    let answer;
    try {
        const response = await api.delete(url, {data: {id}});
        console.log(response);
    } catch(error: any) {
        console.log(error);
    }
}