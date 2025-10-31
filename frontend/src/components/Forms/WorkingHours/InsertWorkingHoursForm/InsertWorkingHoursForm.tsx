'use client';
import { useState, useEffect } from "react";
import Input from "../../Input/Input";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { workingHoursInputs } from "@/datas/Form/WorkingHoursInputObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { workingHoursValidationSchema } from "@/lib/validators/workingHoursValidationSchema";
//import { workingHoursApi } from "@/lib/api/working_hours/workingHoursApi";

import { insertWorkingHours } from "@/lib/api/working_hours/insertWorkingHours";
import styles from './InsertWorkingHoursForm.module.css';

interface InsertWorkingHoursFormProps {
    loggedBarberId: number;
    onSuccess?: () => void;
}

const InsertWorkingHoursForm: React.FC<InsertWorkingHoursFormProps> = ({ loggedBarberId, onSuccess }) => {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLoadingState(false, dispatch);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoadingState(true, dispatch);
        
        const form = e.currentTarget;
        const formData = createFormData(e);
        const validateInputs = formValidator(formData, workingHoursValidationSchema);
        
        if(!validateInputs.status) {
            setMessage(validateInputs.message);
            setIsLoadingState(false, dispatch);
            return;
        }

        // Validate date range
        if (new Date(formData.start_date) > new Date(formData.end_date)) {
            setMessage('Datum početka mora biti pre datuma završetka.');
            setIsLoadingState(false, dispatch);
            return;
        }

        // Validate time range
        if (formData.start_time >= formData.end_time) {
            setMessage('Vreme početka mora biti pre vremena završetka.');
            setIsLoadingState(false, dispatch);
            return;
        }

        const data = {
            userId: loggedBarberId,
            start_date: formData.start_date,
            end_date: formData.end_date,
            start_time: formData.start_time,
            end_time: formData.end_time
        };
        
        // const response = await workingHoursApi.insertWorkingHours(data);
        const response = await insertWorkingHours(data);
        
        if(!response.success) {
            setMessage(response.message);
            setIsLoadingState(false, dispatch);
            return;
        }
        
        setMessage('Radni sati su uspešno uneseni.');
        form.reset();
        setIsLoadingState(false, dispatch);
        
        if(onSuccess) {
            onSuccess();
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Dodaj radno vreme</h3>
            <Input inputs={workingHoursInputs} />
            <p className={message ? styles.message : ''}>{message}</p>
            <button type="submit" className={styles.submitBtn}>DODAJ RADNO VREME</button>
        </form>
    );
};

export default InsertWorkingHoursForm;


