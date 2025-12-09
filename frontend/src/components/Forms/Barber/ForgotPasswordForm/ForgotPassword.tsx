import { useState } from "react";
import Input from "../../Input/Input";
import { forgotPasswordInputs } from "@/datas/Form/lnputObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { emailValidationSchema } from "@/lib/validators/validationSchema";
import { forgotPassword } from "@/lib/api/user/forgotPassword";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import styles from '../../Form.module.css';
const ForgotPassword: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
        const validateData = formValidator(formData, emailValidationSchema);
        if(!validateData.status) {
            setMessage(validateData.message);
            return;
        }
        setIsLoadingState(true, dispatch);
        const response = await forgotPassword(formData as {email: string});
        console.log(response);
        if(!response.success) {
            setMessage(response.message || 'Greška prilikom izvršenja upita');
            setIsLoadingState(false, dispatch);
        }
        form.reset();
        setMessage(response.message);
        setIsLoadingState(false, dispatch);
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={forgotPasswordInputs} />
            <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>Pošalji</button>
        </form>
    );
};
export default ForgotPassword;