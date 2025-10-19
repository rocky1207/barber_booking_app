import store, { AppDispatch, RootState } from "@/store/store";
import { appointmentActions } from "@/store/slices/appointmentSlice";
/*
export const appointmentActionDispatcher = (data: {date: string; startAppointment: string}, action: string, dispatch: AppDispatch) => {
console.log(data);
console.log(action);
}
*/
export const appointmentActionDispatcher = (data: {id: number}, action: string, dispatch: AppDispatch): void => {
    const state: RootState = store.getState();
    const clientTerms = state.appointment.clientTerms;
    const updatedClientTerms = clientTerms.filter(term => term.appointmentId !== data.id);
    console.log(updatedClientTerms);
    dispatch(appointmentActions.setClientTerms(updatedClientTerms));
}