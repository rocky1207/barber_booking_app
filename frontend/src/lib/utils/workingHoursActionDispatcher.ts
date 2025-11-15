import store, { AppDispatch, RootState } from "@/store/store";
import { WorkingHoursType } from "@/types/WorkingHours/WorkingHoursType";
import { workingHoursActions } from "@/store/slices/workingHoursSlice";
export const workingHoursActiondispatcher = (data: WorkingHoursType[] | WorkingHoursType | {id: number}, actionDone: string,dispatch: AppDispatch) => {
    console.log(data);
    const state: RootState = store.getState();
    const currentUserWorkingHours: WorkingHoursType[] = state.workingHours.userWorkingHours;
    const {id} = data as {id: number};
    if(actionDone === 'GET_WORKING_HOURS_BY_USER_ID') {
        const userWorkingHours = Array.isArray(data) ? data : [];
        dispatch(workingHoursActions.setUserWorkingHours(userWorkingHours));
    }
    if(actionDone === 'INSERT_WORKING_HOURS') {
        const addedUserWorkingHours = [
            ...currentUserWorkingHours,
            data as WorkingHoursType
        ];
        console.log(addedUserWorkingHours);
        dispatch(workingHoursActions.setUserWorkingHours(addedUserWorkingHours));
    }
    if(actionDone === 'DELETE_WORKING_HOURS_BY_ID') {
        const updatedUserWorkingHours = currentUserWorkingHours.filter(hours => hours.id !== id);
        dispatch(workingHoursActions.setUserWorkingHours(updatedUserWorkingHours));
    }
    
}