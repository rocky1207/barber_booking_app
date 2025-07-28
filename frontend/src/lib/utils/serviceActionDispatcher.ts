import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { AppDispatch } from "@/store/store";
import { serviceActions } from "@/store/slices/serviceSlice";
import store, { RootState } from "@/store/store";
import { formatPrice } from "./formatPrice";


export const serviceActionDispatcher = ( data: {id: number} | SingleServiceType , actionDone: string, dispatch: AppDispatch): void => {
    const state: RootState = store.getState();
    const services = state.service.services;
    console.log(data);
    let updatedServices: SingleServiceType[] = [];
    if(actionDone === 'INSERT') {
        if('userId' in data && 'userService' in data && 'price' in data && 'description' in data) {
            const service = {
            ...data,
            price: formatPrice(data.price)
        }
        updatedServices = [
            ...services,
            service
        ];
        
        }
    };
    
    if(actionDone === 'DELETE') {
        updatedServices = services.filter(service => service.id !== data.id);
    };
    dispatch(serviceActions.setServiceSlice(updatedServices));
}