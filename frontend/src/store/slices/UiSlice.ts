import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: {isLoading: boolean} = {
    isLoading: false
}
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    }
});
export const uiActions = uiSlice.actions;
const uiSliceReducer = uiSlice.reducer;
export default uiSliceReducer;
