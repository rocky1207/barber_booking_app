import { NavigateBtnType } from "@/types/Button/BtnType";

const NavigateButton:React.FC<NavigateBtnType> = ({...btnData}) => {
    const {className, text, type, validate, onAction, ...buttonProps} = btnData;
    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('eto ga');
        e.preventDefault();
        if (!onAction) return; // 🔒 zaštita od undefined
        onAction();
    }
    return (
        <div>
            <button type={type} onClick={clickHandler} className={className} {...buttonProps}>{text}</button>
        </div>
    );
};
export default NavigateButton;