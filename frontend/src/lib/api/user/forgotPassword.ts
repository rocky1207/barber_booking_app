import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";
export const forgotPassword = async (data: {email: string}) => {
    let answer;
    const url = apiRoutes.FORGOT_PASSWORD;
    try {
        const response = await api.post(url, data);
        console.log(response);
        if(response.status === 200) {
            answer = {
                success: true, 
                data: response.data.data,
                message: response.data.message,
                actionDone: 'FORGOT_PASSWORD'
            }
        } else {
            throw new Error(response.data.message || 'Greška prilikom izvršenja upita');
        }

    } catch (error: any) {
        answer = {success: false, message: error.message};
    };
    return answer;
}