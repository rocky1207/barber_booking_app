import { barberActions } from "@/store/slices/barberSlice";
import { AppDispatch } from "@/store/store";
import store, { RootState }  from "@/store/store";
//import { RootState } from "@/store/store";
export const barberActionDispatcher = (id: string, dispatch: AppDispatch) => {
    const state: RootState = store.getState();
    const barbers = state.barber.barbers;
    const newBarbersState = barbers.filter(barber => barber.id !== parseInt(id));
    dispatch(barberActions.setBarbers(newBarbersState));
} 