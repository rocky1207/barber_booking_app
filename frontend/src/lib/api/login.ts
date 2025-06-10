import api from "../axios";
export const login = async (data: {username: string; password: string;}): Promise<any> => {
    try {
        const response = await api.post("/login.php", data);
        return response.data;
      } catch(error) {
          console.log(error);
          throw error;
    }
};