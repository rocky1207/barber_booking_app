import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BarberItemPropsType } from "@/types/Barbers/BarberItemPropsType";

const initialState: {barbers: BarberItemPropsType[]} = {
    barbers: []
};

const barberSlice = createSlice({
    name: 'barber',
    initialState,
    reducers: {
        setBarbers: (state, action: PayloadAction<BarberItemPropsType[]>) => {
            console.log(action.payload);
            state.barbers = action.payload;
        }
    }
});
export const barberActions = barberSlice.actions;
const barberSliceReducer = barberSlice.reducer;
export default barberSliceReducer;