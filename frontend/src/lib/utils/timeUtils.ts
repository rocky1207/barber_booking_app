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
    console.log(timeStr);
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

/**
 * Gets current time in HH:MM format
 * @returns Current time string in HH:MM format
 */
export const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

/**
 * Gets current date in DD/MM/YYYY format
 * @returns Current date string in DD/MM/YYYY format
 */
export const getCurrentDate = (): string => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
};

/**
 * Checks if a time slot is available based on current time
 * @param timeSlot - Time slot to check (HH:MM format)
 * @param selectedDate - Selected date (DD/MM/YYYY format)
 * @param bufferMinutes - Buffer time in minutes (default: 60)
 * @returns True if time slot is available, false otherwise
 */
export const isTimeSlotAvailable = (
    timeSlot: string, 
    selectedDate: string, 
    bufferMinutes: number = 60
): boolean => {
    const currentDate = getCurrentDate();
    
    // If selected date is not today, all slots are available
    if (selectedDate !== currentDate) {
        return true;
    }
    const currentTime = getCurrentTime();
    const currentTimeMinutes = timeToMinutes(currentTime);
    const slotTimeMinutes = timeToMinutes(timeSlot);
    const bufferTimeMinutes = currentTimeMinutes + bufferMinutes;
    
    // Slot is available if it's at least bufferMinutes after current time
    return slotTimeMinutes >= bufferTimeMinutes;
};

/**
 * Filters time slots based on current time and buffer
 * @param timeSlots - Array of time slots to filter
 * @param selectedDate - Selected date (DD/MM/YYYY format)
 * @param bufferMinutes - Buffer time in minutes (default: 60)
 * @returns Filtered array of available time slots
 */
export const filterAvailableTimeSlots = (
    timeSlots: string[], 
    selectedDate: string, 
    bufferMinutes: number = 60
): string[] => {
    return timeSlots.filter(slot => 
        isTimeSlotAvailable(slot, selectedDate, bufferMinutes)
    );
};

