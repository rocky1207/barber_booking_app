import { ClientAppointmentsSliceType } from "../Appointments/AppointmentsType";
export interface BasicAppointmentReturnType {
    success: boolean;
    message: string;
    actionDone?: string;
};
export interface InsertAppointmentReturnData extends BasicAppointmentReturnType {
    data?: {date: string, startAppointment: string};
};
export interface GetReservedAppointmentsReturnData extends BasicAppointmentReturnType {
    data?: string[];
};
export interface GetClientAppointmentsReturnData extends BasicAppointmentReturnType {
    data?: ClientAppointmentsSliceType[];
};