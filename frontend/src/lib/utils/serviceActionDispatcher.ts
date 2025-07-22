import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { AppDispatch } from "@/store/store";
import { serviceActions } from "@/store/slices/serviceSlice";
import store, { RootState } from "@/store/store";
import { formatPrice } from "./formatPrice";


export const serviceActionDispatcher = (actionDone: string, data: SingleServiceType, dispatch: AppDispatch) => {
    const state: RootState = store.getState();
    const services = state.service.services;
    console.log(data);
    if(actionDone === 'INSERTED') {
        const service = {
            ...data,
            price: formatPrice(data.price)
        }
        const updatedServices = [
            ...services,
            service
        ];
        dispatch(serviceActions.setServiceSlice(updatedServices));
    }
    
}