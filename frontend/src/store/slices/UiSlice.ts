import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeleteItemErrorType {
    delete_barber: string;
    delete_service: string;
    delete_client_appointment: string;
    delete_barber_appointment: string;
    delete_working_hours_by_id: string;
}
interface InitialStateType {
    isLoading: boolean, 
    deleteItemErrorMessage: DeleteItemErrorType;
}

const initialState: InitialStateType = {
    isLoading: false,
    deleteItemErrorMessage: {
        delete_barber: '',
        delete_service: '',
        delete_client_appointment: '',
        delete_barber_appointment: '',
        delete_working_hours_by_id: ''
    }
}
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setDeleteItemErrorMessage: (state, action: PayloadAction<DeleteItemErrorType>) => {
            state.deleteItemErrorMessage = action.payload
        },
    }
});
export const uiActions = uiSlice.actions;
const uiSliceReducer = uiSlice.reducer;
export default uiSliceReducer;
