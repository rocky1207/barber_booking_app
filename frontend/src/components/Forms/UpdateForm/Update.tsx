"use client";
import { useState } from "react";
import Input from "../Input/Input";
import FileInput from "../FileInput/FileInput";
import { registerValidationSchema } from "@/lib/validators/validationSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks/typizedHooks";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/store/store";
import { LoginInputType } from "@/types/Form/LoginInputType";
import { loginRegister } from "@/lib/api/loginRegister";
import styles from '../Form.module.css';
import { createFormData } from "@/lib/utils/createFormData";

const Update: React.FC = () => {
    const {barbers} = useAppSelector((state: RootState) => state?.barber);
    const params = useSearchParams();
    const userId = params.get('id');
    const paramId = userId !== null ? parseInt(userId, 10) : undefined;
    const barber = barbers.find(barberItem => paramId === barberItem.id);
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const [fileName, setFileName] = useState<string>(barber?.file ?? '');
    
        const dispatch = useAppDispatch();
        
        const updateInputs: LoginInputType[] = [
            {type: 'text', name: 'username', defaultValue: barber?.username, placeholder: "Korisničko ime"},
            {type: 'text', name: 'role', defaultValue: barber?.role, placeholder: "Uloga"},
        ];
        console.log(updateInputs);
        

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
        console.log(formData);
        const data = {
           ...formData,
           id: userId!,
           file: fileName
        }
        const result = await loginRegister('user/updateUser.php', data, 'PATCH');
        if(!result.success) {
            setErrorMessage(result.message);
            return;
        }
        setErrorMessage(result.message);
        console.log(result);
    };
    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={updateInputs} schema={registerValidationSchema}/>
            <FileInput setFileName={setFileName} fileName={fileName} />
             <p>{errorMessage}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
        </>
    );
};
export default Update;