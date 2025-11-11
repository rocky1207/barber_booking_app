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
        console.log(data);
        if('userId' in data && 'userService' in data && 'price' in data) {
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
    
    if(actionDone === 'DELETE_SERVICE') {
        updatedServices = services.filter(service => service.id !== data.id);
    };
    
    if(actionDone === 'UPDATE') {
        if('userId' in data && 'userService' in data && 'price' in data) {
            updatedServices = services.map((service) => {
                if(service.id === data.id) {
                    service = {
                        ...data,
                        price: formatPrice(data.price)
                    }
                }
                return service;
            });
        }
    };
    dispatch(serviceActions.setServiceSlice(updatedServices));
}