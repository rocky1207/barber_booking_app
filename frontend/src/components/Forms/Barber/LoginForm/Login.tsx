"use client";
import { useState} from "react";
import { useRouter } from 'next/navigation';
import Input from "../../Input/Input";
import { loginInputs } from "@/datas/Form/lnputObjects";
import { loginValidationSchema } from "@/lib/validators/validationSchema";
import { formValidator } from "@/lib/validators/formValidator";
import { createFormData } from "@/lib/utils/createFormData";
import { loginRegisterUser } from "@/lib/api/user/loginRegisterUser";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
import styles from '../../Form.module.css';
const LogIn:React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = createFormData(e);
        const validateData = formValidator(formData, loginValidationSchema);
        if(!validateData.status) {
            setIsLoadingState(false, dispatch);
            setErrorMessage(validateData.message);
            return;
        }
        setIsLoadingState(true, dispatch); 
        const {success, data, actionDone, message} = await loginRegisterUser(formData, 'LOGIN_BARBER');
        if(!success) {
            setIsLoadingState(false, dispatch);
            setErrorMessage(message);
        return;
        }
       barberActionDispatcher(data as BasicBarberType, actionDone as string, dispatch);
        router.push('/login/dashboard');
    };
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={loginInputs}/>
             {typeof errorMessage === 'string' && <p>{errorMessage}</p>}
             <button type="submit" className={styles.submitBtn}>POTVRDI</button>
        </form>
    );
};
export default LogIn;