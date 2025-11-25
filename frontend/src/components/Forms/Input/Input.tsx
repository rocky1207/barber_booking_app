import { LoginInputType } from "@/types/Form/LoginInputType";

const Input:React.FC<{inputs:LoginInputType[]}> = ({inputs}) => {
   return (
    <>
      {inputs.map((input) => {
      const labelText = input.name === 'suspended' ? 'SUSPENDUJ' : '';
        return (
          <div key={input.name}>
            <label htmlFor="">
            <input
              {...input}
              defaultValue={input.defaultValue || ''}
            />{labelText}
            </label>
          </div>
        );
      })}
      </>
  );
};
export default Input;