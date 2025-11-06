import { useState } from "react";
import Input from "../../Input/Input";
import { forgotPasswordInputs } from "@/datas/Form/lnputObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { emailValidationSchema } from "@/lib/validators/validationSchema";
import { forgotPassword } from "@/lib/api/user/forgotPassword";
import styles from '../../Form.module.css';
const ForgotPassword: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = createFormData(e);
        console.log(formData);
        /*
        const validateData = formValidator(formData, emailValidationSchema);
        if(!validateData.status) {
            setMessage(validateData.message);
            return;
        }
            */
        const data = forgotPassword(formData as {email: string});
        console.log(data);
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={forgotPasswordInputs} />
            <p>{message}</p>
            <button type="submit">Pošalji</button>
        </form>
    );
};
export default ForgotPassword;