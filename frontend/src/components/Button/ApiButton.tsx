import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
import { ApiBtnRefType } from "@/types/Button/BtnType";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";


const ApiButton:React.FC<ApiBtnRefType> = ({dialogRef, ...btnData}) => {
    const {className, text, type, validate, action, onAction, ...buttonProps} = btnData;
    const dispatch = useAppDispatch();
    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!onAction || !btnData.id) return;
        let url: string = '';
        if(action === 'GET_TERMINS') url = apiRoutes.GET_CLIENTS;
        if(action === 'UPDATE') url = apiRoutes.UPDATE_USER;
        if(action === 'DELETE') url = apiRoutes.DELETE_USER;
       
        const {actionDone} = await onAction(url, btnData.id);
        console.log(actionDone);
        actionDone && barberActionDispatcher(btnData.id, dispatch);
        dialogRef?.current?.close();
    }
    return (
        <div>
            <button type={type} onClick={clickHandler} className={className} {...buttonProps}>{text}</button>
        </div>
    );
};
export default ApiButton;