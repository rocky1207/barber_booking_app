import { ValidationSchemaType } from "@/types/Form/ValidationSchemaType";

export const workingHoursValidationSchema: ValidationSchemaType = {
    start_date: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        errorMessage: 'Datum mora biti u formatu YYYY-MM-DD.'
    },
    end_date: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        errorMessage: 'Datum mora biti u formatu YYYY-MM-DD.'
    },
    start_time: {
        required: true,
        pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        errorMessage: 'Vreme mora biti u formatu HH:MM.'
    },
    end_time: {
        required: true,
        pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        errorMessage: 'Vreme mora biti u formatu HH:MM.'
    }
};


