"use client";
import { useState } from "react";
import Input from "../Input/Input";
import NavigateButton from "@/components/Button/NavigateButton";
import { registerInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { registerValidationSchema } from "@/lib/validators/validationSchema";
import { registerBtn } from "@/datas/ButttonObjects";
import FileInput from "../FileInput/FileInput";
import { createFormData } from "@/lib/utils/createFormData";
import { login } from "@/lib/api/login";
import styles from '../Form.module.css';

const Register:React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const [fileName, setFileName] = useState<string>('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
        const data = {...formData, file: fileName};
        
        const validateData = formValidator(data, registerValidationSchema);
        if(!validateData.status) {
            setErrorMessage(validateData.message);
            return;
        }
        const result = await login('user/register.php', data);
        if(!result.success) {
            setErrorMessage(result.message);
            return;
        }
        
        console.log(registerInputs);
        form.reset();
        setFileName('');
        setErrorMessage('Uspešno ste uneli novog korisnika');
    };

return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={registerInputs} schema={registerValidationSchema}/>
            <FileInput setFileName={setFileName} fileName={fileName} />
             <p>{errorMessage}</p>
            <NavigateButton {...registerBtn} />
        </form>
        </>
    );
};
export default Register;