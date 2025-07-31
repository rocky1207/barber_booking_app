import { createSlice } from "@reduxjs/toolkit";
import { SingleServiceType } from "@/types/Api/ReturnServiceType"
import { PayloadAction } from "@reduxjs/toolkit";

export interface ServiceState {
  services: SingleServiceType[];
  serviceActionId: number;
}
const initialState: ServiceState = {
    services: [],
    serviceActionId: 0
};


const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setServiceSlice: (state, action: PayloadAction<SingleServiceType[]>) => {
            console.log(action.payload);
            state.services = action.payload;
        },
        setActionServiceId: (state, action: PayloadAction<number>) => {
            state.serviceActionId = action.payload;
        }
    }
});
export const serviceActions = serviceSlice.actions;
const serviceSliceReducer = serviceSlice.reducer;
export default serviceSliceReducer;