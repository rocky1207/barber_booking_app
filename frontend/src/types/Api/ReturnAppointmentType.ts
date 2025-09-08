export interface BasicAppointmentReturnType {
    success: boolean;
    message: string;
    actionDone?: string;
}
export interface InsertAppointmentReturnData extends BasicAppointmentReturnType {
    data?: {date: string, startAppointment: string};
} 