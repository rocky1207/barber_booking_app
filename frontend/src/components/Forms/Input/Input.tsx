import { useState } from "react";
import { LoginInputType } from "@/types/Form/LoginInputType";

const Input:React.FC<{inputs:LoginInputType[]}> = ({inputs}) => {
    // Dinamičko kreiranje početnog stanja
    /*
  const initialState = inputs.reduce((acc, input) => {
    acc[input.name] = input.type === "file" ? null : input.value || "";
    return acc;
  }, {} as { [key: string]: string | File | null });

  const [inputFields, setInputFields] = useState<{
    [key: string]: string | File | null;
  }>(initialState);
  */
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
/*
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    setInputFields((prevState) => ({...prevState, [name]: value}));
  };
  */
  /*
  let bla: string | undefined;
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;

    const newValue = type === "file" ? files?.[0] ?? null : value;
    const updatedState = {
      ...inputFields,
      [name]: newValue,
    };
    const input = inputs.find((input) => input.name === name);
    bla = input?.onAction(name, newValue, schema);
    setErrorMessage(bla);
    console.log(bla);
  }
*/
  return (
    <>
      {inputs.map((input) => {
        
        return (
          <div key={input.name}>
            <input
              {...input}
              defaultValue={input.defaultValue || ''}
              /*onBlur={handleBlur}*/
            />
            
          </div>
        );
      })}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};
export default Input;