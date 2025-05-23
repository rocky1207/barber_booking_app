import { LoginInputType } from "@/types/Form/InputType";


const Input:React.FC<{inputs:LoginInputType[]}> = ({inputs}) => {
    return (
        <>
        {inputs.map((input: LoginInputType) => {
            return (
                <div key={input.name}>
                    <input type={input.type} name={input.name} placeholder={input.placeholder} />
                </div>
            );
        })}
        </>
    );
};
export default Input;