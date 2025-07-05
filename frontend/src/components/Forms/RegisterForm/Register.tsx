"use client";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import Input from "../Input/Input";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import { registerInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { registerValidationSchema } from "@/lib/validators/validationSchema";
import FileInput from "../FileInput/FileInput";
import { createFormData } from "@/lib/utils/createFormData";
import { loginRegister } from "@/lib/api/loginRegister";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import styles from '../Form.module.css';

const Register:React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const [fileName, setFileName] = useState<string>('');
    const {barbers} = useAppSelector((state: RootState) => state?.barber);
    const dispatch = useAppDispatch();
    const params = useSearchParams();
    const userId = params.get('id');
    const paramId = userId !== null ? parseInt(userId, 10) : undefined;
    let updateInputs;
    if(paramId !== undefined && !isNaN(paramId)) {
      
        const barber = barbers.find(barberItem => barberItem.id === paramId);
        console.log(`hello ${userId}`);
        console.log(barber);
       
        updateInputs = (paramId !== undefined && !isNaN(paramId) && barber)
        ? registerInputs.map((input) => ({
            ...input,
            defaultValue: barber[input.name as keyof typeof barber] || ''
        }))
        : registerInputs;
    } else {
        console.log(`hello top`);
    }
    
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
        const result = await loginRegister('user/register.php', data, 'POST');
        console.log(result);
        if(!result.success || !result.data) {
            setErrorMessage(result.message || "Greška prilikom registracije");
            return;
        };
        
        const user = result.data.data;
            
        barberActionDispatcher(user, 'INSERT', dispatch);
        console.log(registerInputs);
        form.reset();
        setFileName('');
        setErrorMessage('Uspešno ste uneli novog korisnika');
    };

return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={registerInputs} />
            <FileInput setFileName={setFileName} fileName={fileName} />
             <p>{errorMessage}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
        </>
    );
};
export default Register;