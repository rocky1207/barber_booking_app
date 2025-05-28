"use client";
import { useState } from "react";
import Input from "../Input/Input";
import Button from "@/components/Button/Button";
import { loginInputs } from "@/datas/Form/lnputObjects";
import { loginBtn } from "@/datas/ButttonObjects";
import { loginValidationSchema } from "@/lib/validators/validationSchema";
import { loginValidator } from "@/lib/validators/loginValidator";
import { login } from "@/lib/api/login";
import { CustomAxiosErrorType } from "@/types/Api/CustomAxiosErrorType";
import styles from './LoginForm.module.css';
const LogIn:React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const formData = new FormData(e.currentTarget);
        const data: {username: string, password: string} = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
        };
        /*
        const result = loginValidator(data, loginValidationSchema);
        if(typeof result === 'string') {
            setErrorMessage(result);
            return;
        } 
    */
        try {
            const result = await login(data);
            console.log(result);
           if(!result.response) setErrorMessage(result.message);
        } catch(error) {
            console.log(error);
            const err = error as CustomAxiosErrorType;
            setErrorMessage(err.message);
        }
        
        
    };
console.log(errorMessage);
    return (
        <form className={styles.login} onSubmit={handleSubmit}>
            <Input inputs={loginInputs} schema={loginValidationSchema}/>
             {typeof errorMessage === 'string' && <p>{errorMessage}</p>}
            <Button {...loginBtn} />
        </form>
    );
};
export default LogIn;