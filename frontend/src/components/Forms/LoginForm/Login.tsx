"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Input from "../Input/Input";
import { loginInputs } from "@/datas/Form/lnputObjects";
import { formValidationSchema } from "@/lib/validators/validationSchema";
import { formValidator } from "@/lib/validators/formValidator";
import { createFormData } from "@/lib/utils/createFormData";
import { loginRegister } from "@/lib/api/loginRegister";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { barberActions } from "@/store/slices/barberSlice";
import { isLoadingState } from "@/lib/utils/setIsLoadingState";
import styles from '../Form.module.css';
const LogIn:React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        isLoadingState(false, dispatch);
      }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const data = createFormData(e);
        const validateData = formValidator(data, formValidationSchema);
        
        console.log(validateData);
        if(!validateData.status) {
            isLoadingState(false, dispatch);
            setErrorMessage(validateData.message);
            return;
        }
        isLoadingState(true, dispatch); 
        const result = await loginRegister("/login.php", data, 'POST');
        if(!result.success) {
            isLoadingState(false, dispatch);
            setErrorMessage(result.message);
        return;
        } 
        result?.data && dispatch(barberActions.setLoggedBarber(result?.data?.data));
        router.push('/login/dashboard');
    };

    
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={loginInputs} schema={formValidationSchema}/>
             {typeof errorMessage === 'string' && <p>{errorMessage}</p>}
             <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
    );
};
export default LogIn;