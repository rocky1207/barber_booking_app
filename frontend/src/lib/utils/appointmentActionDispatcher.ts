import store, { AppDispatch, RootState } from "@/store/store";
import { appointmentActions } from "@/store/slices/appointmentSlice";

export const appointmentActionDispatcher = (data: {id: number}, actionDone: string, dispatch: AppDispatch): void => {
    const state: RootState = store.getState();
    const {id} = data as {id: number};
    if(actionDone === 'DELETE_CLIENT_APPOINTMENT') {
        const clientTerms = state.appointment.clientTerms;
        const updatedClientTerms = clientTerms.filter(term => term.appointmentId !== id);
        console.log(updatedClientTerms);
        dispatch(appointmentActions.setClientTerms(updatedClientTerms));
    } else if(actionDone === 'DELETE_BARBER_APPOINTMENT') {
        const barberTerms = state.appointment.barberTerms;
        const updatedBarberTerms = barberTerms.filter((term) => term.appointmentId !== id);
        dispatch(appointmentActions.setBarberTerms(updatedBarberTerms));
    }
}