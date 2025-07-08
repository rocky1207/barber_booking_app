import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
import { ApiBtnRefType } from "@/types/Button/BtnType";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";


const ApiButton:React.FC<ApiBtnRefType> = ({dialogRef, ...btnData}) => {
    console.log(btnData);
    const {className, text, type, validate, action, onAction, id, ...buttonProps} = btnData;
    const dispatch = useAppDispatch();
    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!onAction || !btnData.id || !action) return;
        let url: string = '';
        if(action === 'GET_TERMINS') url = apiRoutes.GET_CLIENTS;
       // if(action === 'UPDATE') url = apiRoutes.UPDATE_USER;
        if(action === 'DELETE') url = apiRoutes.DELETE_USER;
        if(action === 'INSERT_SERVICE') url = apiRoutes.INSERT_SERVICE;
        
        const {actionDone} = await onAction(url, btnData.id);

        const data = {id: btnData.id};
        actionDone && barberActionDispatcher(data, actionDone.toUpperCase(), dispatch);
        dialogRef?.current?.close();
    }
    return (
        <div>
            <button id={id?.toString()} type={type} onClick={clickHandler} className={className} {...buttonProps}>{text}</button>
        </div>
    );
};
export default ApiButton;