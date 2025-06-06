import { LoginBtnType } from "@/types/Button/LoginBtnType";
const Button:React.FC<LoginBtnType> = ({...btnData}) => {
    const {divClass, className, text, onAction, ...buttonProps} = btnData;
    return (
        <div>
            <button className={className} {...buttonProps}>{text}</button>
        </div>
    );
};
export default Button;