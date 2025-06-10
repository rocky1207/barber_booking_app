"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Input from "../Input/Input";
import Button from "@/components/Button/Button";
import { loginInputs } from "@/datas/Form/lnputObjects";
import { loginBtn } from "@/datas/ButttonObjects";
import { formValidationSchema } from "@/lib/validators/validationSchema";
import { formValidator } from "@/lib/validators/formValidator";
import { login } from "@/lib/api/login";
import { CustomAxiosErrorType } from "@/types/Api/CustomAxiosErrorType";

import styles from '../Form.module.css';
const LogIn:React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: {username: string, password: string} = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
        };
        
        const result = formValidator(data, formValidationSchema);
        console.log(result);
        if(typeof result === 'string') {
            setErrorMessage(result);
            return;
        } 
    
        try {
            const result = await login(data);
            console.log(result);
           if(!result) {
            setErrorMessage(result.message);
           }
           router.push('/login/dashboard');
        } catch(error) {
            console.log(error);
            const err = error as CustomAxiosErrorType;
            setErrorMessage(err.message);
        }
        
        
    };
console.log(errorMessage);
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={loginInputs} schema={formValidationSchema}/>
             {typeof errorMessage === 'string' && <p>{errorMessage}</p>}
            <Button {...loginBtn} />
        </form>
    );
};
export default LogIn;