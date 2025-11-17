import { format } from 'date-fns';
export const formatWorkingHours = (date: Date | null) => date ? format(date, 'HH:mm') : '';
export const formatWorkingDate = (date: Date | null) => date ? format(date, 'yyyy-MM-dd') : '';