import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BarberSliceType } from "@/types/Barbers/BarbersType";
import { BarberType } from "@/types/Barbers/BarbersType";

const initialState: BarberSliceType = {
    barbers: [],
    currentBarberId: ''
};

const barberSlice = createSlice({
    name: 'barber',
    initialState,
    reducers: {
        setBarbers: (state, action: PayloadAction<BarberType[]>) => {
            console.log(action.payload);
            state.barbers = action.payload;
        },
        setCurrentBarberId: (state, action: PayloadAction<string>) => {
            state.currentBarberId = action.payload;
        }
    }
});
export const barberActions = barberSlice.actions;
const barberSliceReducer = barberSlice.reducer;
export default barberSliceReducer;