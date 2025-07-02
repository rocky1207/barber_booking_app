import { useState } from "react";
import Input from "../Input/Input";
import { changePasswordInputs } from "@/datas/Form/lnputObjects";
import { changePasswordValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { changePassword } from "@/lib/api/changePassword";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import styles from "../Form.module.css";

const ChangePasswordForm: React.FC = () => {
    const {id} = useAppSelector((state: RootState) => state.barber?.loggedBarber)
    const [message, setMessage] = useState<string>('');
    const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
    
        const validateInputs = formValidator(formData, changePasswordValidationSchema);
        if(!validateInputs.status) {
            setMessage(validateInputs.message);
            return;
        }
        
        const data = {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
            id: id
        }
        
        const response = await changePassword(data); 
        console.log(response);
        if(response) {
            setMessage(response.message);
        }
        form.reset();
    }
    return (
        <form className={styles.form} onSubmit={handleClick}>
            <Input inputs={changePasswordInputs} schema={changePasswordValidationSchema} />
            <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
    );
};
export default ChangePasswordForm;