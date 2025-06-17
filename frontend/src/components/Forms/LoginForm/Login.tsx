"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Input from "../Input/Input";
import Button from "@/components/Button/NavigateButton";
import { loginInputs } from "@/datas/Form/lnputObjects";
import { loginBtn } from "@/datas/ButttonObjects";
import { formValidationSchema } from "@/lib/validators/validationSchema";
import { formValidator } from "@/lib/validators/formValidator";
import { createFormData } from "@/lib/utils/createFormData";
import NavigateButton from "@/components/Button/NavigateButton";
import { login } from "@/lib/api/login";

import styles from '../Form.module.css';
const LogIn:React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = createFormData(e);
        const validateData = formValidator(data, formValidationSchema);
        console.log(validateData);
        if(!validateData.status) {
            setErrorMessage(validateData.message);
            return;
        } 
    
        const result = await login("/login.php", data);
        console.log(result);
        if(!result.success) {
        setErrorMessage(result.message);
        return;
        } 
        router.push('/login/dashboard');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={loginInputs} schema={formValidationSchema}/>
             {typeof errorMessage === 'string' && <p>{errorMessage}</p>}
            <NavigateButton {...loginBtn} />
        </form>
    );
};
export default LogIn;