"use client";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import Input from "../../Input/Input";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import { resetPasswordInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { resetPasswordValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { loginRegisterUser } from "@/lib/api/user/loginRegisterUser";
//import { useAppSelector } from "@/store/hooks/typizedHooks";
//import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import styles from '../../Form.module.css';

const ResetPassword: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    // const {barbers} = useAppSelector((state: RootState) => state?.barber);
    const dispatch = useAppDispatch();
    const params = useSearchParams();
    const id = params.get('user_id') ?? '';
    const userId = id !== '' ? parseInt(id, 10) : '';
    const token = params.get('token') ?? '';
   // const userId = id ? parseInt(id, 10) : undefined;
    //.log(userId);
    //console.log(token);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
        const validateData = formValidator(formData, resetPasswordValidationSchema);
        if(!validateData.status) {
            setErrorMessage(validateData.message);
            return;
        }
        const data = {
            newPassword: formData.newPassword,
            userId,
            token
        };
        setIsLoadingState(true, dispatch);
        const response = await loginRegisterUser(data, 'RESET_PASSWORD');
        console.log(response);
        if(!response.success/* || !response.data*/) {
            setErrorMessage(response.message || "Greška prilikom izvršenja upita");
            setIsLoadingState(false, dispatch);
            return;
        };
       // const user = result.data.data;
       // barberActionDispatcher(user, 'INSERT', dispatch);
        form.reset();
        setErrorMessage(response.message);
        setIsLoadingState(false, dispatch);
    };

return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={resetPasswordInputs} />
            <p>{errorMessage}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
    );
};
export default ResetPassword;