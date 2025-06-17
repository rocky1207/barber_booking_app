import { NavigateBtnType } from "@/types/Button/BtnType";
import { ReturnType } from "@/types/Api/ReturnType";

const NavigateButton:React.FC<NavigateBtnType> = ({...btnData}) => {
    const {divClass, className, text, type, validate, onAction, ...buttonProps} = btnData;
    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
       // if (!onAction) return; // 🔒 zaštita od undefined
        onAction();
          // (onAction as () => void)();
        
       
    }
    return (
        <div>
            <button type={type} onClick={clickHandler} className={className} {...buttonProps}>{text}</button>
        </div>
    );
};
export default NavigateButton;