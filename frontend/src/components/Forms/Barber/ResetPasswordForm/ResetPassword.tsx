"use client";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import Input from "../../Input/Input";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import { resetPasswordInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { resetPasswordValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { loginRegisterUpdate } from "@/lib/api/loginRegisterUpdate";
//import { useAppSelector } from "@/store/hooks/typizedHooks";
//import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
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
    console.log(userId);
    console.log(token);

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
        console.log(formData);
        /*
        const validateData = formValidator(formData, resetPasswordValidationSchema);
        if(!validateData.status) {
            setErrorMessage(validateData.message);
            return;
        }
            */
        //console.log(validateData);
        const data = {
            newPassword: formData.newPassword,
            userId,
            token
        };
        console.log(data);
        
        const result = await loginRegisterUpdate('user/resetPassword.php', data, 'PATCH');
        console.log(result);
        if(!result.success || !result.data) {
            setErrorMessage(result.message || "Greška prilikom registracije");
            return;
        };
       // const user = result.data.data;
       // barberActionDispatcher(user, 'INSERT', dispatch);
        form.reset();
        
        setErrorMessage('Uspešno ste uneli novu lozinku.');

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