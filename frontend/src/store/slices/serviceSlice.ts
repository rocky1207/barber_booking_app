import { createSlice } from "@reduxjs/toolkit";
import { SingleServiceType } from "@/types/Api/ReturnServiceType"
import { PayloadAction } from "@reduxjs/toolkit";

export interface ServiceState {
  services: SingleServiceType[];
  serviceActionId: number;
  choosenServices: SingleServiceType[];
}
const initialState: ServiceState = {
    services: [],
    serviceActionId: 0,
    choosenServices: []
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
        },
        setChoosenServices: (state, action: PayloadAction<SingleServiceType[]>) => {
            state.choosenServices = action.payload;
        }
    }
});
export const serviceActions = serviceSlice.actions;
const serviceSliceReducer = serviceSlice.reducer;
export default serviceSliceReducer;