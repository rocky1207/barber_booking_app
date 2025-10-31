import { WorkingHoursApiResponse, WorkingHoursFormData } from '@/types/WorkingHours/WorkingHoursType';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/barber_booking_app/backend/public';

export const workingHoursApi = {
    // Insert working hours
    /*
    insertWorkingHours: async (data: WorkingHoursFormData & { userId: number }): Promise<WorkingHoursApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/working_hours/insertWorkingHours.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
*/
    // Get working hours by user ID
    /*
    getWorkingHoursByUserId: async (userId: number): Promise<WorkingHoursApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/working_hours/getWorkingHoursByUserId.php?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },
    */
    // Get working hours by ID
    getWorkingHoursById: async (id: number): Promise<WorkingHoursApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/working_hours/getWorkingHoursById.php?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    // Get working hours for specific date
    /*
    getWorkingHoursForDate: async (userId: number, date: string): Promise<WorkingHoursApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/working_hours/getWorkingHoursForDate.php?userId=${userId}&date=${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },
    */
    // Get all working hours
    getAllWorkingHours: async (): Promise<WorkingHoursApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/working_hours/getAllWorkingHours.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    // Update working hours
    updateWorkingHours: async (id: number, data: WorkingHoursFormData): Promise<WorkingHoursApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/working_hours/updateWorkingHours.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, ...data }),
        });
        return response.json();
    },

    // Delete working hours
    deleteWorkingHours: async (id: number): Promise<WorkingHoursApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/working_hours/deleteWorkingHours.php`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        return response.json();
    },
};


