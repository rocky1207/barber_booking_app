'use client';
import { useState, useEffect } from "react";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { formValidator } from "@/lib/validators/formValidator";
import { workingHoursValidationSchema } from "@/lib/validators/validationSchema";
import { updateItems } from "@/lib/api/updateItems";
import { WorkingHoursType } from "@/types/WorkingHours/WorkingHoursType";
import { convertFormDateType } from "@/lib/utils/convertFormDateType";
import { convertStringToDateType } from "@/lib/utils/convertStringToDateType";
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './UpdateWorkingHoursForm.module.css';

const ReactDatePicker = dynamic(
  () =>
    import('react-datepicker').then((mod) => (mod.default as unknown) as ComponentType<any>),
  { ssr: false }
);

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
  
  const dataToConvert = {
    start_date: workingHours.start_date, 
    end_date: workingHours.end_date, 
    start_time: workingHours.start_time, 
    end_time: workingHours.end_time,
  }
  const dateTypeObj = convertStringToDateType(dataToConvert);
  const [changeWorkingHours, setChangeWorkingHours] = useState<Record<string, Date | null>>(dateTypeObj);
  const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLoadingState(false, dispatch);
    }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formDataObj = convertFormDateType(form);
    const validateInputs = formValidator(formDataObj, workingHoursValidationSchema);
      
    if(!validateInputs.status) {
        setMessage(validateInputs.message);
        return;
    }
    const {start_date, end_date, start_time, end_time} = convertStringToDateType(formDataObj);
    if (new Date(start_date as Date) > new Date(end_date as Date)) {
        setMessage('Datum početka mora biti pre datuma završetka.');
        return;
    }
    if ((start_time && end_time) && start_time >= end_time) {
        setMessage('Vreme početka mora biti pre vremena završetka.');
         return;
    }
    const updateData = {
        id: workingHours.id,
        start_date: formDataObj.start_date as string,
        end_date: formDataObj.end_date as string,
        start_time: formDataObj.start_time as string, 
        end_time: formDataObj.end_time as string
    };
    setIsLoadingState(true, dispatch);
    const responseData = await updateItems(updateData, 'UPDATE_WORKING_HOURS');
    const {success, message, data, actionDone} = responseData;
    if(!success) {
        setMessage(message);
        setIsLoadingState(false, dispatch);
        return;
    }
    setMessage(message || 'Radni sati su uspešno ažurirani.');
    setIsLoadingState(false, dispatch);
    if(onSuccess) {
        onSuccess();
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Izmeni radno vreme</h3>
       <label>Datum od</label>
        <ReactDatePicker
          name='start_date'
          selected={changeWorkingHours.start_date as Date | null}
          onChange={(d: Date | null) => setChangeWorkingHours((prev: any) => ({...prev, start_date: d}))}
          dateFormat="yyyy-MM-dd"
          placeholderText="Datum od"
          className={styles.datePickerInput}
        />
       <label>Datum do</label>
       <ReactDatePicker
        name='end_date'
        selected={changeWorkingHours.end_date as Date | null}
        onChange={(d: Date | null) => setChangeWorkingHours((prev: any) => ({...prev, end_date: d}))}
        dateFormat="yyyy-MM-dd"
        placeholderText="Datum do"
        className={styles.datePickerInput}
       />
      <label>Početno vreme</label>
      <ReactDatePicker
        name='start_time'
        selected={changeWorkingHours.start_time as Date | null}
        onChange={(d: Date | null) => setChangeWorkingHours((prev: any) => ({...prev, start_time: d}))}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Vreme"
        dateFormat="HH:mm"
        placeholderText="Izaberi vreme"
        className={styles.datePickerInput}
      />
      <label>Završno vreme</label>
      <ReactDatePicker
       name='end_time'
        selected={changeWorkingHours.end_time as Date | null}
        onChange={(d: Date | null) => setChangeWorkingHours((prev: any) => ({...prev, end_time: d}))}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Vreme"
        dateFormat="HH:mm"
        placeholderText="Izaberi vreme"
        className={styles.datePickerInput}
      />
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





