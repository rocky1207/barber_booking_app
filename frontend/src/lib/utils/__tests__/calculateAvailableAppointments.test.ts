/**
 * Test file for calculateAvailableAppointments utility
 * This file can be run with Jest or similar testing framework
 */

import { calculateAvailableTimeSlots } from '../calculateAvailableAppointments';
import { DEFAULT_WORKING_HOURS } from '../timeUtils';

describe('calculateAvailableTimeSlots', () => {
  it('should return all available slots when no appointments are reserved', () => {
    const reservedAppointments: string[] = [];
    const config = {
      serviceCount: 1,
      slotDuration: 30,
      workingHours: DEFAULT_WORKING_HOURS
    };

    const availableSlots = calculateAvailableTimeSlots(reservedAppointments, config);
    
    // Should have slots from 09:00 to 19:30 (every 30 minutes)
    expect(availableSlots).toContain('09:00');
    expect(availableSlots).toContain('09:30');
    expect(availableSlots).toContain('19:30');
    expect(availableSlots).not.toContain('20:00'); // Should not exceed working hours
  });

  it('should exclude reserved time slots', () => {
    const reservedAppointments = ['10:00', '14:30'];
    const config = {
      serviceCount: 1,
      slotDuration: 30,
      workingHours: DEFAULT_WORKING_HOURS
    };

    const availableSlots = calculateAvailableTimeSlots(reservedAppointments, config);
    
    expect(availableSlots).not.toContain('10:00');
    expect(availableSlots).not.toContain('14:30');
    expect(availableSlots).toContain('09:30'); // Should still be available
    expect(availableSlots).toContain('15:00'); // Should still be available
  });

  it('should handle multi-service appointments correctly', () => {
    const reservedAppointments = ['10:00']; // 10:00-10:30 is reserved
    const config = {
      serviceCount: 2, // 2 services = 1 hour total
      slotDuration: 30,
      workingHours: DEFAULT_WORKING_HOURS
    };

    const availableSlots = calculateAvailableTimeSlots(reservedAppointments, config);
    
    // Should not include slots that would conflict with the 1-hour reservation
    expect(availableSlots).not.toContain('09:30'); // 09:30-10:30 would conflict
    expect(availableSlots).not.toContain('10:00'); // 10:00-11:00 would conflict
    expect(availableSlots).not.toContain('10:30'); // 10:30-11:30 would conflict
    expect(availableSlots).toContain('11:00'); // 11:00-12:00 should be available
  });

  it('should respect working hours', () => {
    const reservedAppointments: string[] = [];
    const config = {
      serviceCount: 1,
      slotDuration: 30,
      workingHours: { start: 9, end: 18 } // 09:00 to 18:00
    };

    const availableSlots = calculateAvailableTimeSlots(reservedAppointments, config);
    
    expect(availableSlots).toContain('09:00');
    expect(availableSlots).toContain('17:30'); // Last available slot
    expect(availableSlots).not.toContain('18:00'); // Should not exceed working hours
  });

  it('should handle buffer time between appointments', () => {
    const reservedAppointments = ['10:00'];
    const config = {
      serviceCount: 1,
      slotDuration: 30,
      bufferTime: 15, // 15 minutes buffer
      workingHours: DEFAULT_WORKING_HOURS
    };

    const availableSlots = calculateAvailableTimeSlots(reservedAppointments, config);
    
    // With 15-minute buffer, 10:00 reservation becomes 10:00-10:45
    expect(availableSlots).not.toContain('10:00');
    expect(availableSlots).not.toContain('10:30'); // Would conflict with buffer
    expect(availableSlots).toContain('11:00'); // Should be available
  });
});

// Example usage and expected behavior documentation
console.log('Test examples:');
console.log('1. No reservations:', calculateAvailableTimeSlots([], { serviceCount: 1 }));
console.log('2. With 10:00 reserved:', calculateAvailableTimeSlots(['10:00'], { serviceCount: 1 }));
console.log('3. Multi-service (2 services):', calculateAvailableTimeSlots(['10:00'], { serviceCount: 2 }));
