import { 
  timeToMinutes, 
  minutesToTime, 
  DEFAULT_WORKING_HOURS, 
} from './timeUtils';
import { AppointmentConfig } from '@/types/Appointments/AppointmentsType';
//import { workingHoursApi } from '@/lib/api/working_hours/workingHoursApi';
import { getWorkingHoursForDate } from '../api/working_hours/getWorkingHoursForDate';



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
 * Calculates available time slots using barber's working hours
 * @param reservedAppointments - Array of reserved appointment start times
 * @param config - Configuration for appointment calculation
 * @param userId - Barber's user ID
 * @param date - Selected date in DD/MM/YYYY format
 * @returns Array of available time slots in HH:MM format
 */
export const calculateAvailableTimeSlotsWithWorkingHours = async (
  reservedAppointments: string[], 
  config: AppointmentConfig,
  userId: number,
  date: string
): Promise<string[]> => {
  try {
    // Convert date from DD/MM/YYYY to YYYY-MM-DD for API
    const [day, month, year] = date.split('/');
    const apiDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    
    // Get barber's working hours for the selected date
    //const response = await workingHoursApi.getWorkingHoursForDate(userId, apiDate);
    const response = await getWorkingHoursForDate(userId, apiDate);
    console.log(response);
    if (!response.success || !response.data || response.data.length === 0) {
      // No working hours for this date - barber is not working
      return [];
    }
    
    // Use the first working hours entry (assuming one per day for now)
    const workingHours = response.data[0];
    const workStartTime = workingHours.start_time.substring(0, 5); // Remove seconds
    const workEndTime = workingHours.end_time.substring(0, 5);
    
    // Convert working hours to minutes
    const workStartMinutes = timeToMinutes(workStartTime);
    const workEndMinutes = timeToMinutes(workEndTime);
    
    const {
      serviceCount,
      slotDuration = 30,
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
    
  } catch (error) {
    console.error('Error fetching working hours:', error);
    // Fallback to default working hours
    return calculateAvailableTimeSlots(reservedAppointments, config);
  }
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