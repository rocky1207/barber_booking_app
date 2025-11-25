import { BasicApiReturnType } from "./ApiReturnType";
import { ClientAppointmentsSliceType } from "../Appointments/AppointmentsType";
import { BarberAppointmentsType } from "../Appointments/AppointmentsType";

export interface InsertAppointmentReturnData extends BasicApiReturnType {
    data?: {date: string, startAppointment: string};
};
export interface GetReservedAppointmentsReturnDataType extends BasicApiReturnType {
    data?: string[];
};
export interface GetBarberAppointmentsReturnDataType extends BasicApiReturnType {
    data?: BarberAppointmentsType[];
};
export interface GetClientAppointmentsReturnData extends BasicApiReturnType {
    data?: ClientAppointmentsSliceType[];
};
