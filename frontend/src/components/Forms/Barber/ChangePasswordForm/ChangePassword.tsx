import { useState } from "react";
import Input from "../../Input/Input";
import { changePasswordInputs } from "@/datas/Form/lnputObjects";
import { changePasswordValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { changePassword } from "@/lib/api/user/changePassword";
import { useAppDispatch, useAppSelector } from "@/store/hooks/typizedHooks";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { RootState } from "@/store/store";
import styles from "../../Form.module.css";

const ChangePassword: React.FC = () => {
    const {id} = useAppSelector((state: RootState) => state.barber?.loggedBarber);
    console.log(id);
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
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
        setIsLoadingState(true, dispatch);
        const response = await changePassword(data); 
        if(!response.success) {
            setMessage(response.message);
            setIsLoadingState(false, dispatch);
            return;
        }
        setMessage(response.message);
        form.reset();
        setIsLoadingState(false, dispatch);
    }
    return (
        <form className={styles.form} onSubmit={handleClick}>
            <Input inputs={changePasswordInputs} />
            <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
    );
};
export default ChangePassword;