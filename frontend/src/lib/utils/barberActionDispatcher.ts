import { barberActions } from "@/store/slices/barberSlice";
import { AppDispatch } from "@/store/store";
import store, { RootState }  from "@/store/store";
import { BasicBarberType } from "@/types/Barbers/BarbersType";

export const barberActionDispatcher = (data: {id: number} | BasicBarberType, actionDone: string, dispatch: AppDispatch): void => {
    const state: RootState = store.getState();
    const barbers = state.barber.barbers;
    if(actionDone === 'DELETE') {
        const newBarbersState = barbers.filter(barber => barber.id !== data.id);
        dispatch(barberActions.setBarbers(newBarbersState));
    }
    if(actionDone === 'INSERT') {
        if('username' in data && 'file' in data && 'role' in data) {
            const newBarbersState = [...barbers, data];
            console.log(newBarbersState);
            dispatch(barberActions.setBarbers(newBarbersState));
        }
    }
    if(actionDone === 'UPDATE') {
        if('username' in data && 'file' in data && 'role' in data) {
            const removedItemBarbers = barbers.filter(barberItem => barberItem.id !== data.id);
            const newBarbersState = [...removedItemBarbers, data];
            dispatch(barberActions.setBarbers(newBarbersState));
        }
    }
} 