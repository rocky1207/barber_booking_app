export interface BasicAppointmentsType {
    userId: number;
    name: string;
    surname: string;
    phone: string;
    email?: string;
    serviceIds: number[]
}