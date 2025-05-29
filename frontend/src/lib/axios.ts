import axios, { AxiosError } from "axios";
import { CustomAxiosErrorType } from "@/types/Api/CustomAxiosErrorType";


const URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Kreiraj instancu
const api = axios.create({
  baseURL: URL, // izmeni po potrebi
 /*headers: {
  "Content-Type": "application/json",
 },*/
 // withCredentials: false, // true ako koristiš cookie-session autentikaciju
 withCredentials: true,
});

// Dodavanje tokena ako postoji u localStorage (ili sessionStorage)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
     /* const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }*/
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Globalna obrada grešaka
api.interceptors.response.use(
  (response) => {console.log(response); return response},
  (error: AxiosError) => {
    console.log(error);
    let message = "Došlo je do neočekivane greške. Pokušajte ponovo.";
    let statusCode;
    if (error.response) {
      message = (error.response.data as any)?.message || message;
      statusCode = (error.response.data as any)?.status;
    } else if (error.request) {
      message = "Nema odgovora sa servera. Proverite internet vezu.";
    } else {
      message = error.message;
    }

    // Prikaz poruke korisniku (zameni sa toast/alert/modal po želji)
    alert(message);

    const customError: CustomAxiosErrorType = {
        message,
        status: statusCode ? statusCode : error.response?.status,
        original: error
    };
return Promise.reject(customError);
  }
);

export default api;