import { ApiBtnRefType } from "@/types/Button/BtnType";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { useRouter } from "next/navigation";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { serviceActionDispatcher } from "@/lib/utils/serviceActionDispatcher";
import { appointmentActionDispatcher } from "@/lib/utils/appointmentActionDispatcher";
import { workingHoursActiondispatcher } from "@/lib/utils/workingHoursActionDispatcher";
import { uiActions } from "@/store/slices/uiSlice";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";

const ApiButton:React.FC<ApiBtnRefType> = ({dialogRef, ...btnData}) => {
    const {className, text, type, validate, action, onAction, id, ...buttonProps} = btnData;
    const loggedBarrberId = useAppSelector((state: RootState) => state.barber?.loggedBarber.id);
    const deleteItemErrorMessage = useAppSelector((state: RootState) => state.ui.deleteItemErrorMessage);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!onAction || !id || !action) return;
        setIsLoadingState(true, dispatch);
        let {success, actionDone, message} = await onAction(action, id);
        if(!success) {
            const actionKey = action.toLowerCase();
            const updateDeleteErrorMessage = {
                ...deleteItemErrorMessage,
                [actionKey]: message
            }
            dispatch(uiActions.setDeleteItemErrorMessage(updateDeleteErrorMessage));
            dialogRef?.current?.close();
            setIsLoadingState(false, dispatch);
            return;
        }
        const data = {id};
        actionDone === 'DELETE_BARBER' && barberActionDispatcher(data, actionDone, dispatch);
        actionDone === 'DELETE_BARBER' && loggedBarrberId === id && router.push('/');
        actionDone === 'DELETE_SERVICE' && serviceActionDispatcher(data, actionDone, dispatch);
        actionDone === 'DELETE_CLIENT_APPOINTMENT' && appointmentActionDispatcher(data, actionDone, dispatch);
        actionDone === 'DELETE_BARBER_APPOINTMENT' && appointmentActionDispatcher(data, actionDone, dispatch);
        actionDone === 'DELETE_WORKING_HOURS_BY_ID' && workingHoursActiondispatcher(data, actionDone, dispatch);

        dialogRef?.current?.close();
    }
    return (
        <div>
            <button id={id?.toString()} type={type} onClick={clickHandler} className={className} {...buttonProps}>{text}</button>
        </div>
    );
};
export default ApiButton;