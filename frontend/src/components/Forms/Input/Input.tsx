import { InputFieldsType } from "@/types/Form/InputFieldsType";
import styles from '@/components/Forms/Form.module.css';

const Input:React.FC<{inputs: InputFieldsType[]}> = ({inputs}) => {
  console.log(inputs);
   return (
    <>
      {inputs.map((input) => {
      const labelText = input.name === 'suspended' ? 'SUSPENDUJ' : '';
        return (
          <div key={input.name}>
            <label htmlFor={input.name} className={styles.labelMark}>{/*input.required ? '*' : ''*/}</label>
            <input
              {...input}
              defaultValue={input.defaultValue || ''}
            />{labelText}
          </div>
        );
      })}
      </>
  );
};
export default Input;