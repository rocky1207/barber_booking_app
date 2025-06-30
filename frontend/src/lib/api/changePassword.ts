import api from "../axios";
export const changePassword  = async (data: {oldPassword: string; newPassword: string; confirmPassword: string; id: number}) => {
    try {
        const response = await api.post('/user/changePassword.php', data);
    } catch (error: any) {
        return {status: false, message: error.message}
    }
};
