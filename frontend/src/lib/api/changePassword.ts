import api from "../axios";
export const changePassword  = async (data: {oldPassword: string; newPassword: string; confirmPassword: string; id: number}): Promise<{success: boolean, message: string}> => {
    try {
        const response = await api.post('/user/changePassword.php', data);
        return {success: true, message: response.data.data.message}
    } catch (error: any) {
        return {success: false, message: error.message}
    }
};
