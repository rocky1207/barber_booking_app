import api from "@/lib/axios";
export const getUserServices = async (url: string, id: number): Promise<void> => {
    console.log(url, id);
    let answer;
    try {
        const response = await api.get(url, {params: {id}});
       console.log(response.data);
    } catch(error: any) {
        console.log(error.message);
    }
} 