import api from "../axios";
export const login = async (data: {username: string; password: string;}): Promise<any> => {
    console.log(data);
    try {
        const response = await api.post("/login.php", data);
        console.log(response);
        return response.data;
      } catch(error) {
          console.log(error);
          throw error;
    }
};