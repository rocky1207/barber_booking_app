"use client";
import { useState } from "react";
import Input from "../Input/Input";
import FileInput from "../FileInput/FileInput";
import { registerValidationSchema } from "@/lib/validators/validationSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks/typizedHooks";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { LoginInputType } from "@/types/Form/LoginInputType";
import { loginRegister } from "@/lib/api/loginRegister";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import NavigateButton from "@/components/Button/NavigateButton";
import { changePasswordBtn } from "@/datas/ButttonObjects";
import { createFormData } from "@/lib/utils/createFormData";
import styles from '../Form.module.css';
import extraStyles from './Update.module.css';


const Update: React.FC = () => {
    const barberState = useAppSelector((state: RootState) => state?.barber);
    const params = useSearchParams();
    const userId = params.get('id');
    const paramId = userId !== null ? parseInt(userId, 10) : undefined;
    const barber = barberState?.barbers.find(barberItem => paramId === barberItem.id);
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const [fileName, setFileName] = useState<string>(barber?.file ?? '');

    const dispatch = useAppDispatch();
    const router = useRouter();
    const updateInputs: LoginInputType[] = [
        {type: 'text', name: 'username', defaultValue: barber?.username, placeholder: "Korisničko ime"},
        {type: 'text', name: 'role', defaultValue: barber?.role, placeholder: "Uloga"},
    ];
    console.log(barberState?.loggedBarber);
    console.log(paramId);
        

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
        console.log(data);
        const result = await loginRegister('user/updateUser.php', data, 'PATCH');
        if(!result.success) {
            setErrorMessage(result.message);
            return;
        }
        setErrorMessage(result?.data?.message);
        console.log(result);
        const user = result?.data?.data;
        user && barberActionDispatcher(user, 'UPDATE', dispatch);
    };
    
    const handleClick = () => {
        router.push(`/login/dashboard/changePassword?id=${paramId}`);
    }
    const newChangePasswordBtn = {
        ...changePasswordBtn,
        onAction: handleClick
    }
    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={updateInputs} schema={registerValidationSchema}/>
            <FileInput setFileName={setFileName} fileName={fileName} />
             <p>{errorMessage}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
        <div className={extraStyles.changePasswordDiv}>
            {barberState?.loggedBarber?.id === paramId &&<NavigateButton {...newChangePasswordBtn} />}
        </div>
        </>
    );
};
export default Update;