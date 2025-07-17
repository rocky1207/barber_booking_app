import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
import { ApiBtnRefType } from "@/types/Button/BtnType";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { useRouter } from "next/navigation";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";


const ApiButton:React.FC<ApiBtnRefType> = ({dialogRef, ...btnData}) => {
    const {className, text, type, validate, action, onAction, id, ...buttonProps} = btnData;
    const loggedBarrberId = useAppSelector((state: RootState) => state.barber?.loggedBarber.id);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!onAction || !id || !action) return;
        let url: string = '';
        if(action === 'GET_TERMINS') url = apiRoutes.GET_CLIENTS;
       // if(action === 'UPDATE') url = apiRoutes.UPDATE_USER;
        if(action === 'DELETE') url = apiRoutes.DELETE_USER;
        if(action === 'INSERT_SERVICE') url = apiRoutes.INSERT_SERVICE;
        
        const {actionDone} = await onAction(url, id);
        const data = {id};
        actionDone && barberActionDispatcher(data, actionDone.toUpperCase(), dispatch);
        actionDone?.toUpperCase() === 'DELETE' && loggedBarrberId === id && router.push('/');
        dialogRef?.current?.close();
    }
    return (
        <div>
            <button id={id?.toString()} type={type} onClick={clickHandler} className={className} {...buttonProps}>{text}</button>
        </div>
    );
};
export default ApiButton;