import { 
  timeToMinutes, 
  minutesToTime, 
  DEFAULT_WORKING_HOURS, 
} from './timeUtils';
import { AppointmentConfig } from '@/types/Appointments/AppointmentsType';



/**
 * Calculates available time slots for appointments
 * @param reservedAppointments - Array of reserved appointment start times
 * @param config - Configuration for appointment calculation
 * @returns Array of available time slots in HH:MM format
 */
export const calculateAvailableTimeSlots = (
  reservedAppointments: string[], 
  config: AppointmentConfig
): string[] => {
  const {
    serviceCount,
    slotDuration = 30,
    workingHours = DEFAULT_WORKING_HOURS,
    bufferTime = 0
  } = config;

  const TOTAL_DURATION = serviceCount * slotDuration;
  
  // Create reserved time intervals with proper duration
  const reservedIntervals = reservedAppointments.map(time => ({
    start: timeToMinutes(time),
    end: timeToMinutes(time) + slotDuration + bufferTime
  }));
  
  // Generate all possible time slots
  const availableSlots: string[] = [];
  const workStartMinutes = workingHours.start * 60;
  const workEndMinutes = workingHours.end * 60;
  
  // Generate slots from work start to work end minus total duration
  for (let slotStart = workStartMinutes; slotStart <= workEndMinutes - TOTAL_DURATION; slotStart += slotDuration) {
    const slotEnd = slotStart + TOTAL_DURATION;
    
    // Check if this slot conflicts with any reserved appointment
    const hasConflict = reservedIntervals.some(reserved => 
      !(slotEnd <= reserved.start || slotStart >= reserved.end)
    );
    
    if (!hasConflict) {
      availableSlots.push(minutesToTime(slotStart));
    }
  }
  
  return availableSlots;
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use calculateAvailableTimeSlots instead
 */
export const calculateAvailableAppointments = (reservedAppointments: string[], num: number): string[] => {
  console.warn('calculateAvailableAppointments is deprecated. Use calculateAvailableTimeSlots instead.');
  
  // Return available slots instead of disabled ones for better UX
  return calculateAvailableTimeSlots(reservedAppointments, {
    serviceCount: num,
    slotDuration: 30,
    workingHours: DEFAULT_WORKING_HOURS
  });
};