"use client";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import Input from "../../Input/Input";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import { registerInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { registerValidationSchema } from "@/lib/validators/validationSchema";
import FileInput from "../../FileInput/FileInput";
import { createFormData } from "@/lib/utils/createFormData";
import { loginRegisterUpdate } from "@/lib/api/loginRegisterUpdate";
import { loginRegisterUser } from "@/lib/api/user/loginRegisterUser";
import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
//import { useAppSelector } from "@/store/hooks/typizedHooks";
//import { RootState } from "@/store/store";
//import { useSearchParams } from "next/navigation";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";

import styles from '../../Form.module.css';
import { BasicBarberType } from "@/types/Barbers/BarbersType";

const Register:React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
   // const {barbers} = useAppSelector((state: RootState) => state?.barber);
    const dispatch = useAppDispatch();
    /*
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
    */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
        const newFormData = {...formData, file: fileName};
        
        const validateData = formValidator(newFormData, registerValidationSchema);
        if(!validateData.status) {
            setMessage(validateData.message);
            return;
        }
        setIsLoadingState(true, dispatch);
       // const response = await loginRegisterUpdate('user/register.php', data, 'POST');
        const {success, data, actionDone} = await loginRegisterUser(newFormData, 'REGISTER_BARBER');
        //console.log(result);
        if(!success/* || !result.data*/) {
            setMessage(message || "Greška prilikom registracije");
            setIsLoadingState(false, dispatch);
            return;
        };
        //const user = response.data;
        barberActionDispatcher(data as BasicBarberType, actionDone as string, dispatch);
        form.reset();
        setFileName('');
        setMessage(message || 'Uspešno ste uneli novog korisnika');
        setIsLoadingState(false, dispatch);
    };

return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={registerInputs} />
            <FileInput setFileName={setFileName} fileName={fileName} />
             <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
    );
};
export default Register;