import { LoginBtnType } from "@/types/Button/LoginBtnType";
const Button:React.FC<LoginBtnType> = ({...btnData}) => {
    const {divClass, text, ...buttonProps} = btnData;
    return (
        <div>
            <button {...buttonProps}>{text}</button>
        </div>
    );
};
export default Button;