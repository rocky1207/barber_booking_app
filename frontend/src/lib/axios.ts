import axios, { AxiosError } from "axios";
import { CustomAxiosErrorType } from "@/types/Api/CustomAxiosErrorType";


const URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const api = axios.create({
  baseURL: URL, // izmeni po potrebi
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Globalna obrada grešaka
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log(error);
    let message = "Došlo je do neočekivane greške. Pokušajte ponovo.";
    let statusCode;
    if (error.response) {
      console.log('da');
      console.log(error.response);
      message = (error.response.data as any)?.message || message;
      statusCode = (error.response.data as any)?.status;
    } else if (error.request) {
      message = "Nema odgovora sa servera. Proverite internet vezu.";
    } else {
      message = error.message;
    }
    const customError: CustomAxiosErrorType = {
        message, 
        status: statusCode ? statusCode : error.response?.status,
        original: error
    };
return Promise.reject(customError);
  }
);
export default api;