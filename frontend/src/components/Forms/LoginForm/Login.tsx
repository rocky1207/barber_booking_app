"use client";
import { useState } from "react";
import Input from "../Input/Input";
import Button from "@/components/Button/Button";
import { loginInputs } from "@/datas/Form/lnputObjects";
import { loginBtn } from "@/datas/ButttonObjects";
import { loginValidationSchema } from "@/lib/validators/validationSchema";
import { loginValidator } from "@/lib/validators/loginValidator";
import styles from './LoginForm.module.css';
const LogIn:React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const formData = new FormData(e.currentTarget);
        const data: { [key: string]: string | File } = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
        };
        const bla = loginValidator(data, loginValidationSchema);
        setErrorMessage(bla);
        console.log(data);
    };

    return (
        <form className={styles.login} onSubmit={handleSubmit}>
            <Input inputs={loginInputs} schema={loginValidationSchema}/>
             {errorMessage && <p>{errorMessage}</p>}
            <Button {...loginBtn} />
        </form>
    );
};
export default LogIn;