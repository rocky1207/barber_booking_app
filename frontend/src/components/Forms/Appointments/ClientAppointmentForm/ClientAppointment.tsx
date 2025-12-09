'use client';
import { useState, useEffect } from "react";
import Input from "../../Input/Input";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { clientAppointmentInputs } from "@/datas/Form/lnputObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { appointmentValidationSchema } from "@/lib/validators/validationSchema";
import { getClientAppointments } from "@/lib/api/appointments/getClientAppointments";
import { appointmentActions } from "@/store/slices/appointmentSlice";
import styles from '../../Form.module.css';

const ClientAppointment = () => {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    useEffect(() => {setIsLoadingState(false, dispatch);}, []);
    const handleSubmmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = createFormData(e);
        console.log(formData);
        const validateInputs = formValidator(formData, appointmentValidationSchema);
        if(!validateInputs.status) {setMessage(validateInputs.message); return;};
        const data = {
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
        };
        setIsLoadingState(true, dispatch);
        const response = await getClientAppointments('GET_CLIENT_APPOINTMENTS', data);
        console.log(response);
        if(!response.success) {
            setMessage(response.message);
            setIsLoadingState(false, dispatch);
            return;
        } 
        const terms = Array.isArray(response.data) ? response.data : [];
        dispatch(appointmentActions.setClientTerms(terms));
        setMessage('');
        form.reset();
        setIsLoadingState(false, dispatch);
    }
    return (
        <form className={styles.form} onSubmit={handleSubmmit}>
            <Input inputs={clientAppointmentInputs} />
            <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>POTVRDI</button>
        </form>
    )
};
export default ClientAppointment;