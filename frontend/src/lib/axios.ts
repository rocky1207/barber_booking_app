import axios, { AxiosError } from "axios";

interface CustomAxiosError {
  message: string;
  status?: number;
  original?: AxiosError;
};

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Kreiraj instancu
const api = axios.create({
  baseURL: URL, // izmeni po potrebi
 // headers: {
  //  "Content-Type": "application/json",
 // },
  withCredentials: false, // true ako koristiš cookie-session autentikaciju
});

// Dodavanje tokena ako postoji u localStorage (ili sessionStorage)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Globalna obrada grešaka
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message = "Došlo je do neočekivane greške. Pokušajte ponovo.";

    if (error.response) {
      message = (error.response.data as any)?.message || message;
    } else if (error.request) {
      message = "Nema odgovora sa servera. Proverite internet vezu.";
    } else {
      message = error.message;
    }

    // Prikaz poruke korisniku (zameni sa toast/alert/modal po želji)
    alert(message);

    const customError: CustomAxiosError = {
        message,
        status: error.response?.status,
        original: error
    };
return Promise.reject(customError);
  }
);

export default api;