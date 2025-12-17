import { barberActions } from "@/store/slices/barberSlice";
import store, { AppDispatch, RootState }  from "@/store/store";
import { logOut } from "../api/user/logOut";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
import { apiRoutes } from "../api/apiRoutes/apiRoutes";

export const barberActionDispatcher = (data: {id: number} | BasicBarberType, actionDone: string, dispatch: AppDispatch): void => {
    const state: RootState = store.getState();
    const barbers = state.barber.barbers;
    const loggedBarber = state.barber.loggedBarber;
    if(actionDone === 'LOGIN_BARBER') dispatch(barberActions.setLoggedBarber(data as BasicBarberType));
    if(actionDone === 'DELETE_BARBER') {
        const newBarbersState = barbers.filter(barber => barber.id !== data.id);
        dispatch(barberActions.setBarbers(newBarbersState));
        if(loggedBarber.id === data.id) logOut(apiRoutes.LOGOUT_USER, {});
    }
    if(actionDone === 'REGISTER_BARBER') {
        if('username' in data && 'file' in data && 'role' in data) {
            const newBarbersState = [...barbers, data];
            console.log(newBarbersState);
            dispatch(barberActions.setBarbers(newBarbersState));
        }
    }
    if(actionDone === 'UPDATE_BARBER') {
        if('username' in data && 'file' in data) {
            const updatedbarbers = barbers.map((barber) => {
                 if (barber.id === data.id) {
                return {
                    ...barber,
                    username: data.username,
                    full_name: data.full_name,
                    file: data.file,
                    suspended: data.suspended,
                    ...(data.role && {role: data.role})
                };
            }
            return barber;
            });
            dispatch(barberActions.setBarbers(updatedbarbers));
            if(loggedBarber.id === data.id) dispatch(barberActions.setLoggedBarber({
                ...loggedBarber,
                username: data.username,
                full_name: data.full_name,
                file: data.file,
                ...(data.role && {role: data.role})
            }));
        }
    }
} 