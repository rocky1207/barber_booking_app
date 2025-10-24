import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
import { ApiBtnRefType } from "@/types/Button/BtnType";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { useRouter } from "next/navigation";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { serviceActionDispatcher } from "@/lib/utils/serviceActionDispatcher";
import { appointmentActionDispatcher } from "@/lib/utils/appointmentActionDispatcher";

const ApiButton:React.FC<ApiBtnRefType> = ({dialogRef, ...btnData}) => {
    const {className, text, type, validate, action, onAction, id, ...buttonProps} = btnData;
    const loggedBarrberId = useAppSelector((state: RootState) => state.barber?.loggedBarber.id);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!onAction || !id || !action) return;
        let url: string = '';
        let slice: string = '';
       // if(action === 'GET_CLIENTS') {
         //   url = apiRoutes.GET_CLIENTS;
          //  slice = 'BARBER';
        //} 
       // if(action === 'UPDATE') url = apiRoutes.UPDATE_USER;
        if(action === 'DELETE') {
            url = apiRoutes.DELETE_USER;
            slice = 'BARBER';
        } 
        
        if(action === 'DELETE_SERVICE') {
            url = apiRoutes.DELETE_SERVICE;
            slice = 'SERVICE';
        } 
        if(action === 'DELETE_APPOINTMENT' || action === 'DELETE_BARBER_APPOINTMENT') {
            url = apiRoutes.DELETE_CLIENT_APPOINTMENT;
            slice = 'APPOINTMENT';
        }
        
        let {actionDone} = await onAction(url, id);
        const data = {id};
        if(action === 'DELETE_APPOINTMENT') actionDone = 'DELETE_APPOINTMENT';
        if(action === 'DELETE_BARBER_APPOINTMENT') actionDone = 'DELETE_BARBER_APPOINTMENT';
        actionDone && slice === 'BARBER' && barberActionDispatcher(data, actionDone.toUpperCase(), dispatch);
        actionDone?.toUpperCase() === 'DELETE' && loggedBarrberId === id && router.push('/');
        actionDone && slice === 'SERVICE' && serviceActionDispatcher(data, actionDone.toUpperCase(), dispatch);
        actionDone && slice === 'APPOINTMENT' && appointmentActionDispatcher(data, actionDone.toUpperCase(), dispatch);
        dialogRef?.current?.close();
    }
    return (
        <div>
            <button id={id?.toString()} type={type} onClick={clickHandler} className={className} {...buttonProps}>{text}</button>
        </div>
    );
};
export default ApiButton;