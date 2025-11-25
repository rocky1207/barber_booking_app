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
import { loginRegisterUser } from "@/lib/api/user/loginRegisterUser";
import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
import styles from '../../Form.module.css';


const Register:React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const dispatch = useAppDispatch();
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
        const {success, data, actionDone} = await loginRegisterUser(newFormData, 'REGISTER_BARBER');
        if(!success/* || !result.data*/) {
            setMessage(message || "Greška prilikom registracije");
            setIsLoadingState(false, dispatch);
            return;
        };
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