import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { AppDispatch } from "@/store/store";
import { serviceActions } from "@/store/slices/serviceSlice";
import store, { RootState } from "@/store/store";


export const serviceActionDispatcher = (actionDone: string, data: SingleServiceType, dispatch: AppDispatch) => {
    const state: RootState = store.getState();
    const services = state.service.services;
    console.log(data);
    if(actionDone === 'INSERTED') {
        
        const newData = [
            ...services,
            data
        ];
        dispatch(serviceActions.setServiceSlice(newData));
    }
    
}