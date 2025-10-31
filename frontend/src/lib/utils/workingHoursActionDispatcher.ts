import store, { AppDispatch, RootState } from "@/store/store";
import { WorkingHoursType } from "@/types/WorkingHours/WorkingHoursType";
import { workingHoursActions } from "@/store/slices/workingHoursSlice";
export const workingHoursActiondispatcher = (data: WorkingHoursType[] | {id: number}, actionDone: string,dispatch: AppDispatch) => {
    const state: RootState = store.getState();
    const currentUserWorkingHours: WorkingHoursType[] = state.workingHours.userWorkingHours;
    const {id} = data as {id: number};
    if(actionDone === 'GET_USER_WORKING_HOURS') {
        const userWorkingHours = Array.isArray(data) ? data : [];
        dispatch(workingHoursActions.setUserWorkingHours(userWorkingHours));
    }
    if(actionDone === 'DELETE_WORKING_HOURS_BY_ID') {
        const updatedUserWorkingHours = currentUserWorkingHours.filter(hours => hours.id !== id);
        dispatch(workingHoursActions.setUserWorkingHours(updatedUserWorkingHours));
    }
    
}