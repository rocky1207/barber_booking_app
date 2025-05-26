import api from "../axios";
export const login = async (data: {username: string; password: string;}): Promise<any> => {
    const response = await api.post("/api/login", data);
    return response.data;
}