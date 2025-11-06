import { ClientAppointmentsSliceType } from "../Appointments/AppointmentsType";
import { BarberAppointmentsType } from "../Appointments/AppointmentsType";
export interface BasicAppointmentReturnType {
    success: boolean;
    message: string;
    actionDone?: string;
};
export interface InsertAppointmentReturnData extends BasicAppointmentReturnType {
    data?: {date: string, startAppointment: string};
};
export interface GetReservedAppointmentsReturnDataType extends BasicAppointmentReturnType {
    data?: string[];
};
export interface GetBarberAppointmentsReturnDataType extends BasicAppointmentReturnType {
    data?: BarberAppointmentsType[];
};
export interface GetClientAppointmentsReturnData extends BasicAppointmentReturnType {
    data?: ClientAppointmentsSliceType[];
};
export interface DeleteClientAppointmentReturnDataType extends BasicAppointmentReturnType {
    data?: {deletedAppointmentId: number};
}