'use client';
import { useState, useEffect } from "react";
import Input from "../../Input/Input";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { clientAppointmentInputs } from "@/datas/Form/lnputObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { appointmentValidationSchema } from "@/lib/validators/validationSchema";
import styles from '../../Form.module.css';
const ClientAppointmentForm = () => {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    useEffect(() => {setIsLoadingState(false, dispatch);}, []);
    const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setIsLoadingState(false, dispatch);
        const form = e.currentTarget;
        const formData = createFormData(e);
        console.log(formData);
        const validateInputs = formValidator(formData, appointmentValidationSchema);
        if(!validateInputs.status) {setMessage(validateInputs.message); return;};
        console.log(validateInputs);
        //setMessage('');
        const data = {
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
        };
    }
    return (
        <form className={styles.form} onSubmit={handleSubmmit}>
            <Input inputs={clientAppointmentInputs} />
            <p>{message}</p>
            <button type="submit">POTVRDI</button>
        </form>
    )
};
export default ClientAppointmentForm;