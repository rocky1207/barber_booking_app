import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkingHoursType, WorkingHoursSliceType } from "@/types/WorkingHours/WorkingHoursType";

const initialState: WorkingHoursSliceType = {
    userWorkingHours: [],
    actionWorkingHoursId: 0
}

const workingHoursSlice = createSlice({
    name: 'workingHours',
    initialState,
    reducers: {
        setUserWorkingHours: (state, action: PayloadAction<WorkingHoursType[]>) => {
            console.log(action.payload);
            state.userWorkingHours = action.payload;
        },
        setActionWorkingHoursId: (state, action: PayloadAction<number>) => {
            state.actionWorkingHoursId = action.payload;
        }
    }
});
export const workingHoursActions = workingHoursSlice.actions;
const workingHoursReducer = workingHoursSlice.reducer;
export default workingHoursReducer; 