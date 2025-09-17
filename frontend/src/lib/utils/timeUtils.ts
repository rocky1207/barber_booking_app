import { WorkingHours } from "@/types/Appointments/AppointmentsType";
/**
 * Utility functions for consistent time handling in the appointment system
 */

/**
 * Normalizes a time string to HH:MM format
 * @param time - Time string in various formats
 * @returns Normalized time string in HH:MM format
 */
export const normalizeTimeString = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Validates if a time string is in correct HH:MM format
 * @param time - Time string to validate
 * @returns True if valid, false otherwise
 */
export const isValidTimeSlot = (time: string): boolean => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
};

/**
 * Converts time string to minutes since midnight
 * @param timeStr - Time string in HH:MM format
 * @returns Minutes since midnight
 */
export const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

/**
 * Converts minutes since midnight to time string
 * @param minutes - Minutes since midnight
 * @returns Time string in HH:MM format
 */
export const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};



/**
 * Default working hours for barber shop
 */
export const DEFAULT_WORKING_HOURS: WorkingHours = {
    start: 9,  // 09:00
    end: 20    // 20:00
};



