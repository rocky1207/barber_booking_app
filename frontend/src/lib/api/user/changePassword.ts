import api from "../../axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
export const changePassword  = async (data: {oldPassword: string; newPassword: string; confirmPassword: string; id: number}): Promise<{success: boolean, message: string}> => {
    const url = apiRoutes.CHANGE_PASSWORD;
    try {
        const response = await api.post(url, data);
        return {success: true, message: response.data.data.message}
    } catch (error: any) {
        return {success: false, message: error.message}
    }
};
