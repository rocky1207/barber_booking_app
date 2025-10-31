import { WorkingHoursInputType } from "@/types/Form/WorkingHoursInputType";

export const workingHoursInputs: WorkingHoursInputType[] = [
    {type: 'date', name: 'start_date', defaultValue: '', placeholder: "Datum od", required: true},
    {type: 'date', name: 'end_date', defaultValue: '', placeholder: "Datum do", required: true},
    {type: 'time', name: 'start_time', defaultValue: '', placeholder: "Vreme od", required: true},
    {type: 'time', name: 'end_time', defaultValue: '', placeholder: "Vreme do", required: true},
];


