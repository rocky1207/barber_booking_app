import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentsSliceType, ClientAppointmentsSliceType } from "@/types/Appointments/AppointmentsType";

const initialState: AppointmentsSliceType = {
    terms: [
        '09:00', 
        '09:30', 
        '10:00', 
        '10:30', 
        '11:00',
        '11:30', 
        '12:00', 
        '12:30', 
        '13:00', 
        '13:30',
        '14:00', 
        '14:30', 
        '15:00', 
        '15:30', 
        '16:00', 
        '16:30', 
        '17:00', 
        '17:30', 
        '18:00', 
        '18:30',
        '19:00', 
        '19:30'
    ],
    selectedTerm: {
        date: '',
        time: ''
    },
    clientTerms: [],
    actionAppointmentId: 0
};

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setTerms: (state, action: PayloadAction<string[]>) => {
            state.terms = action.payload;
        },
        setSelectedTerm: (state, action: PayloadAction<{date: string, time: string}>) => {
            state.selectedTerm = action.payload;
        },
        setClientTerms: (state, action: PayloadAction<ClientAppointmentsSliceType[]>) => {
            console.log(action.payload);
            state.clientTerms = action.payload;
        },
        setActionAppointmentId: (state, action: PayloadAction<number>) => {
            console.log(action.payload);
            state.actionAppointmentId = action.payload;
        }
    }
});
export const appointmentActions = appointmentSlice.actions;
const appointmentSliceReducer = appointmentSlice.reducer;
export default appointmentSliceReducer;
