export interface BasicAppointmentsType {
    userId: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    services: {serviceId: number; date: string;}[]
};
export interface ClientAppointmentsType {
    name: string;
    surname: string;
    phone: string;
};
export interface ClientAppointmentsSliceType extends ClientAppointmentsType {
    appointmentId: number;
    costumerId: number;
    date: string;
    serviceId: number;
    serviceName: string;
    servicePrice: string;
    time: string;
};
/**
 * Interface for working hours configuration
 */
export interface WorkingHours {
    start: number; // Hour (0-23)
    end: number;   // Hour (0-23)
}
/**
 * Interface for appointment time slot
 */
export interface TimeSlot {
  start: string;
  end: string;
  duration: number;
}

/**
 * Configuration for time slot calculation
 */
export interface AppointmentConfig {
  serviceCount: number;
  slotDuration?: number;
  workingHours?: WorkingHours;
  bufferTime?: number;
}
/**
 * Interface for time slot configuration
 */
export interface TimeSlotConfig {
    slotDuration: number;    // Duration of each slot in minutes
    workingHours: WorkingHours;
    bufferTime?: number;     // Buffer time between appointments in minutes
}

