"use client";
import { useState } from "react";
import api from "@/lib/axios";
import Input from "../Input/Input";
import Button from "@/components/Button/Button";
import { registerInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { registerValidationSchema } from "@/lib/validators/validationSchema";
import { registerBtn } from "@/datas/ButttonObjects";
import FileInput from "../FileInput/FileInput";
import styles from '../Form.module.css';

const Register:React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const [fileName, setFileName] = useState<string>('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: {username: string, password: string, role: string, file: string} = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
            role: (formData.get("role") as string) || "",
            file: fileName || ''
        };
        const validateData = formValidator(data, registerValidationSchema);
        console.log(data);
        try {
            const response = await api.post('user/register.php', data);
            console.log(response);
            if(response.status === 200) {
                setErrorMessage('');
                setFileName('');
            }
        } catch(error: any) {
            console.log(error);
            setErrorMessage(error.message);
        }

        /*
        if(validateData) {
            console.log(validateData);
            setErrorMessage(validateData);
        } else {
             
        }
        */
       
        /*
        const result = loginValidator(data, loginValidationSchema);
        if(typeof result === 'string') {
            setErrorMessage(result);
            return;
        } 
    */
        
        
    };
//console.log(errorMessage);
  /*  const handleFile = (file: File | null) => {
        console.log(file);
    } */
    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={registerInputs} schema={registerValidationSchema}/>
            <FileInput /*onFileSelect={handleFile}*/ setFileName={setFileName} fileName={fileName}/>
             {typeof errorMessage === 'string' && <p>{errorMessage}</p>}
            <Button {...registerBtn} />
        </form>
        </>
    );
};
export default Register;