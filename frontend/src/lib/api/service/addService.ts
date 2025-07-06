import api from "@/lib/axios";
interface Service {
    userId: number;
    service: string;
    price: number;
    description: string;
}
export const addService = async (url: string, data: Service) => {
    console.log(url, data);
    /*
    try {
        const response = await api.post(url, data);
        console.log(response);
    } catch(error: any) {
        console.log(error);
    }
        */
}