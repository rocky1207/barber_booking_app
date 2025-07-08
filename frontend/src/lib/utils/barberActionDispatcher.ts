import { barberActions } from "@/store/slices/barberSlice";
import { AppDispatch } from "@/store/store";
import store, { RootState }  from "@/store/store";
import { BasicBarberType } from "@/types/Barbers/BarbersType";

export const barberActionDispatcher = (data: {id: number} | BasicBarberType, actionDone: string, dispatch: AppDispatch): void => {
    const state: RootState = store.getState();
    const barbers = state.barber.barbers;
    const actionId = state.barber.currentBarberId;
    const loggedBarber = state.barber.loggedBarber;
    console.log(actionId);
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
        if('username' in data && 'file' in data) {
            const updatedbarbers = barbers.map((barber) => {
                 if (barber.id === data.id) {
                return {
                    ...barber,
                    username: data.username,
                    file: data.file,
                    ...(data.role && {role: data.role})
                };
            }
            return barber;
            });
            dispatch(barberActions.setBarbers(updatedbarbers));
            if(loggedBarber.id === data.id) dispatch(barberActions.setLoggedBarber({
                ...loggedBarber,
                username: data.username,
                file: data.file,
                ...(data.role && {role: data.role})
            }));
            
        }
    }
} 