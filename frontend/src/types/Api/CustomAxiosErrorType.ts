import { AxiosError } from "axios";
export interface CustomAxiosErrorType {
  message: string;
  status?: number;
  original?: AxiosError;
};