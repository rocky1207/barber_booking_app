import { ApiBtnType } from "@/types/Button/BtnType";
import { ReturnType } from "@/types/Api/ReturnType";

const ApiButton:React.FC<ApiBtnType> = ({...btnData}) => {
    const {divClass, className, text, type, validate, onAction, ...buttonProps} = btnData;
    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!onAction || !btnData.id) return;
        let url: string = '';
        if(text === 'TERMINI') url = '/getClients.php';
        if(text === 'AŽURIRAJ') url = 'user/updateUser.php';
        if(text === 'OBRIŠI') url = 'user/deleteUser.php';
        console.log(url, btnData.id);
            onAction(url, btnData.id);
    }
    return (
        <div>
            <button type={type} onClick={clickHandler} className={className} {...buttonProps}>{text}</button>
        </div>
    );
};
export default ApiButton;