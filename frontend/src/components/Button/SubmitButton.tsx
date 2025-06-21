import { SubmitBtnType } from "@/types/Button/BtnType";
const SubmitButton: React.FC<SubmitBtnType> = ({...btnData}) => {
    console.log(btnData)
    const {text, ...rest} = btnData;
    return (
        <div>
            <button {...rest}>{text}</button>
        </div>
    );
};
export default SubmitButton;