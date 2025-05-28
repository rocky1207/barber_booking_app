import api from "../axios";
export const login = async (data: {username: string; password: string;}): Promise<any> => {
    try {
        const response = await api.post("/api/login", data);
    //console.log(response);
    return response.data;
    } catch(error) {
        throw error;
    }
};