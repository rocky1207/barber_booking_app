/*
import api from "@/lib/axios";
import { WorkingHoursFormData } from "@/types/WorkingHours/WorkingHoursType";
import { WorkingHoursApiResponse } from "@/types/WorkingHours/WorkingHoursType";
import { apiRoutes } from "../apiRoutes/apiRoutes";
export const updateWorkingHours = async (id: number, data: WorkingHoursFormData): Promise<WorkingHoursApiResponse> => {
        const response = await api.post(apiRoutes.UPDATE_WORKING_HOURS, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, ...data }),
        });
        return response.json();
    },
    */