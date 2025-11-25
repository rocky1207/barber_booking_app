import { timeToMinutes, minutesToTime } from './timeUtils';

export interface TimeSlot {
    index: number;
    hour: number;
    minutes: number;
    timeString: string;
}

export const formatTime = (selectedTime: string, num: number): TimeSlot[] => {
    const startMinutes = timeToMinutes(selectedTime);
    const duration = 30; // 30 minutes per service
    const timeSlots: TimeSlot[] = [];
    for (let i = 0; i < num; i++) {
        const slotMinutes = startMinutes + (i * duration);
        const timeString = minutesToTime(slotMinutes);
        const [hour, minutes] = timeString.split(':').map(Number);
        timeSlots.push({
            index: i + 1,
            hour,
            minutes,
            timeString
        });
    }
    return timeSlots;
}