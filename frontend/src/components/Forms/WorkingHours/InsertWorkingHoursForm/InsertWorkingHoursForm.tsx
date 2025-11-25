'use client';
import { useState, useEffect } from "react";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { workingHoursValidationSchema } from "@/lib/validators/validationSchema";
import { workingHoursActiondispatcher } from "@/lib/utils/workingHoursActionDispatcher";
import { insertItems } from "@/lib/api/insertItems";
import { InsertUpdateWorkingHoursApiReturnType } from "@/types/WorkingHours/WorkingHoursType";
import { formatWorkingHours, formatWorkingDate } from "@/lib/utils/formatWorkingHoursAndDate";
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './InsertWorkingHoursForm.module.css';

const ReactDatePicker = dynamic(
  () =>
    import('react-datepicker').then((mod) => (mod.default as unknown) as ComponentType<any>),
  { ssr: false }
);
interface InsertWorkingHoursFormProps {
  loggedBarberId: number;
  onSuccess?: () => void;
};

const InsertWorkingHoursForm: React.FC<InsertWorkingHoursFormProps> = ({ loggedBarberId, onSuccess }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
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
      return;
    }

    if (startDate && endDate && startDate > endDate) {
      setMessage('Datum početka mora biti pre datuma završetka.');
      return;
    }

    if (startTime && endTime && startTime >= endTime) {
      setMessage('Vreme početka mora biti pre vremena završetka.');
      return;
    }
    const startDateStr = formatWorkingDate(startDate as Date);
    const endDateStr = formatWorkingDate(endDate as Date);
    const startTimeStr = formatWorkingHours(startTime as Date).substring(0, 5);
    const strendTimeStr = formatWorkingHours(endTime as Date).substring(0, 5);

    const insertData = {
      userId: loggedBarberId,
      start_date: startDateStr,
      end_date: endDateStr,
      start_time: startTimeStr,
      end_time: strendTimeStr
    };

    setIsLoadingState(true, dispatch);
    const responseData = await insertItems(insertData, 'INSERT_WORKING_HOURS');
    const {success, data, message} = responseData as InsertUpdateWorkingHoursApiReturnType;
    if(!success) {
      setMessage(message);
      setIsLoadingState(false, dispatch);
      return;
    }
    data && workingHoursActiondispatcher(data, 'INSERT_WORKING_HOURS', dispatch);
    setMessage(message);
    form.reset();
    setIsLoadingState(false, dispatch);

    if(onSuccess) onSuccess();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Dodaj radno vreme</h3>
      <label>Datum od</label>
      <ReactDatePicker
        selected={startDate}
        onChange={(d: Date | null) => setStartDate(d)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Datum od"
        className={styles.datePickerInput}
      />
      <label>Datum do</label>
      <ReactDatePicker
        selected={endDate}
        onChange={(d: Date | null) => setEndDate(d)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Datum do"
        className={styles.datePickerInput}
      />
      <label>Početno vreme</label>
      <ReactDatePicker
        selected={startTime}
        onChange={(d: Date | null) => setStartTime(d)}
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
        selected={endTime}
        onChange={(d: Date | null) => setEndTime(d)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Vreme"
        dateFormat="HH:mm"
        placeholderText="Izaberi vreme"
        className={styles.datePickerInput}
      />
      <p className={message ? styles.message : ''}>{message}</p>
      <div>
        Izabrano: {formatWorkingHours(startTime)} — {formatWorkingHours(endTime)}
      </div>
      <button type="submit" className={styles.submitBtn}>DODAJ RADNO VREME</button>
    </form>
  );
};
export default InsertWorkingHoursForm;

