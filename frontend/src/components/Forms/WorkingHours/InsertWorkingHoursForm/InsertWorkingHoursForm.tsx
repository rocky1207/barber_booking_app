'use client';
import { useState, useEffect } from "react";
import Input from "../../Input/Input";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
//import { workingHoursInputs } from "@/datas/Form/WorkingHoursInputObjects";
import { workingHoursInputs } from "@/datas/Form/lnputObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { workingHoursValidationSchema } from "@/lib/validators/validationSchema";
//import { workingHoursApi } from "@/lib/api/working_hours/workingHoursApi";
import { workingHoursActiondispatcher } from "@/lib/utils/workingHoursActionDispatcher";
//import { insertUpdateWorkingHours } from "@/lib/api/working_hours/insertUpdateWorkingHours";
import { insertItems } from "@/lib/api/insertItems";
import { InsertUpdateWorkingHoursApiReturnType } from "@/types/WorkingHours/WorkingHoursType";
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
        const form = e.currentTarget;
        const formData = createFormData(e);
        const validateInputs = formValidator(formData, workingHoursValidationSchema);
        
        if(!validateInputs.status) {
            setMessage(validateInputs.message);
           // setIsLoadingState(false, dispatch);
            return;
        }

        // Validate date range
        if (new Date(formData.start_date) > new Date(formData.end_date)) {
            setMessage('Datum početka mora biti pre datuma završetka.');
           // setIsLoadingState(false, dispatch);
            return;
        }

        // Validate time range
        if (formData.start_time >= formData.end_time) {
            setMessage('Vreme početka mora biti pre vremena završetka.');
            //setIsLoadingState(false, dispatch);
            return;
        }

        const insertData = {
            userId: loggedBarberId,
            start_date: formData.start_date,
            end_date: formData.end_date,
            start_time: formData.start_time,
            end_time: formData.end_time
        };
        
        // const response = await workingHoursApi.insertWorkingHours(data);
        setIsLoadingState(true, dispatch);
       // const responseData = await insertUpdateWorkingHours(data, 'POST');
        const responseData = await insertItems(insertData, 'INSERT_WORKING_HOURS');
        const {success, data, message} = responseData as InsertUpdateWorkingHoursApiReturnType;
       // console.log(response);
        if(!success) {
            setMessage(message);
            setIsLoadingState(false, dispatch);
            return;
        }
        data && workingHoursActiondispatcher(data, 'INSERT_WORKING_HOURS', dispatch);
        setMessage(message);
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



