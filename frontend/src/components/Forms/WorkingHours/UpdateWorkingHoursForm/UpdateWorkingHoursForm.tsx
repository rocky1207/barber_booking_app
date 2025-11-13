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
import { insertUpdateWorkingHours } from "@/lib/api/working_hours/insertUpdateWorkingHours";
import { WorkingHoursType } from "@/types/WorkingHours/WorkingHoursType";
import styles from './UpdateWorkingHoursForm.module.css';

interface UpdateWorkingHoursFormProps {
    workingHours: WorkingHoursType;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const UpdateWorkingHoursForm: React.FC<UpdateWorkingHoursFormProps> = ({ 
    workingHours, 
    onSuccess, 
    onCancel 
}) => {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLoadingState(false, dispatch);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        const form = e.currentTarget;
        const formData = createFormData(e);
        const newFormData = {
            ...formData,
            start_time: formData.start_time.substring(0, 5), 
            end_time: formData.end_time.substring(0, 5)
        }
        const validateInputs = formValidator(newFormData, workingHoursValidationSchema);
        
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
           // setIsLoadingState(false, dispatch);
            return;
        }

        const data = {
            id: workingHours.id,
            start_date: formData.start_date,
            end_date: formData.end_date,
            start_time: formData.start_time.substring(0, 5), 
            end_time: formData.end_time.substring(0, 5)
        };
         setIsLoadingState(true, dispatch);
        //const response = await workingHoursApi.updateWorkingHours(workingHours.id, data);
        const response = await insertUpdateWorkingHours(data, 'PUT');
        if(!response.success) {
            setMessage(response.message);
            setIsLoadingState(false, dispatch);
            return;
        }
        
        setMessage(response.message || 'Radni sati su uspešno ažurirani.');
        setIsLoadingState(false, dispatch);
        
        if(onSuccess) {
            onSuccess();
        }
    };

    // Pre-populate form with existing data
    const populatedInputs = workingHoursInputs.map(input => ({
        ...input,
        defaultValue: workingHours[input.name as keyof WorkingHoursType] as string || ''
    }));

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Izmeni radno vreme</h3>
            <Input inputs={populatedInputs} />
            <p className={message ? styles.message : ''}>{message}</p>
            <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitBtn}>AŽURIRAJ</button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className={styles.cancelBtn}>
                        OTKAŽI
                    </button>
                )}
            </div>
        </form>
    );
};

export default UpdateWorkingHoursForm;



