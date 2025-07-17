import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BarberSliceType } from "@/types/Barbers/BarbersType";
import { BasicBarberType } from "@/types/Barbers/BarbersType";

const initialState: BarberSliceType = {
    barbers: [],
    loggedBarber: {
        id: 0,
        username: '',
        file: '',
        role: ''
    },
    currentBarberId: undefined
};

const barberSlice = createSlice({
    name: 'barber',
    initialState,
    reducers: {
        setBarbers: (state, action: PayloadAction<BasicBarberType[]>) => {
            state.barbers = action.payload;
        },
        setLoggedBarber: (state, action: PayloadAction<BasicBarberType>) => {
            state.loggedBarber = action.payload;
        },
        setCurrentBarberId: (state, action: PayloadAction<number | undefined>) => {
            state.currentBarberId = action.payload;
        }
    }
});
export const barberActions = barberSlice.actions;
const barberSliceReducer = barberSlice.reducer;
export default barberSliceReducer;