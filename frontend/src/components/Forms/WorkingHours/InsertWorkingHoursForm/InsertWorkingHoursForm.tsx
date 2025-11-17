/*'use client';
import { useState, useEffect } from "react";
import Input from "../../Input/Input";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { workingHoursInputs } from "@/datas/Form/lnputObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { workingHoursValidationSchema } from "@/lib/validators/validationSchema";
import { workingHoursActiondispatcher } from "@/lib/utils/workingHoursActionDispatcher";
import { insertItems } from "@/lib/api/insertItems";
import { InsertUpdateWorkingHoursApiReturnType } from "@/types/WorkingHours/WorkingHoursType";
import styles from './InsertWorkingHoursForm.module.css';

import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import dynamic from 'next/dynamic';
import { format } from 'date-fns';
const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false });
// import css na vrhu fajla ili u globalnom css-u (možeš kasnije ukloniti ako ne želiš stilove)
import 'react-datepicker/dist/react-datepicker.css';
interface InsertWorkingHoursFormProps {
    loggedBarberId: number;
    onSuccess?: () => void;
}

const InsertWorkingHoursForm: React.FC<InsertWorkingHoursFormProps> = ({ loggedBarberId, onSuccess }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [startTime, setStartTime] = useState<string | null>('08:00');
    const [endTime, setEndTime] = useState<string | null>('23:00');
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    console.log(startDate);
    console.log(endDate);
    console.log(startTime);
    console.log(endTime);
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

        // Validate date range
        if (new Date(formData.start_date) > new Date(formData.end_date)) {
            setMessage('Datum početka mora biti pre datuma završetka.');
           return;
        }

        // Validate time range
        if (formData.start_time >= formData.end_time) {
            setMessage('Vreme početka mora biti pre vremena završetka.');
             return;
        }

        const insertData = {
            userId: loggedBarberId,
            start_date: formData.start_date,
            end_date: formData.end_date,
            start_time: formData.start_time,
            end_time: formData.end_time
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
        
        if(onSuccess) {
            onSuccess();
        }
    };

    return (
        
    
        </>
        /*<form className={styles.form} onSubmit={handleSubmit}>
            <h3>Dodaj radno vreme</h3>
            <Input inputs={workingHoursInputs} />
            <p className={message ? styles.message : ''}>{message}</p>
            <button type="submit" className={styles.submitBtn}>DODAJ RADNO VREME</button>
        </form>
    );
};

export default InsertWorkingHoursForm;
*/
/*
'use client';
import React, { useState, useEffect } from "react";
import Input from "../../Input/Input";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { workingHoursInputs } from "@/datas/Form/lnputObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { workingHoursValidationSchema } from "@/lib/validators/validationSchema";
import { workingHoursActiondispatcher } from "@/lib/utils/workingHoursActionDispatcher";
import { insertItems } from "@/lib/api/insertItems";
import { InsertUpdateWorkingHoursApiReturnType } from "@/types/WorkingHours/WorkingHoursType";
import styles from './InsertWorkingHoursForm.module.css';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// ako koristiš react-time-picker i ostalo, možeš ostaviti import; ovde ne koristimo
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';

import { format } from 'date-fns';

interface InsertWorkingHoursFormProps {
  loggedBarberId: number;
  onSuccess?: () => void;
}

const formatTime = (d: Date | null) => (d ? format(d, 'HH:mm') : '');

const InsertWorkingHoursForm: React.FC<InsertWorkingHoursFormProps> = ({ loggedBarberId, onSuccess }) => {
  // zaštita od SSR — ako nema window, vrati null (ili možeš vratiti skeleton)
  if (typeof window === 'undefined') return null;

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  // koristimo Date | null za time pickere (react-datepicker radi sa Date objektima)
  const [startTime, setStartTime] = useState<Date | null>(() => {
    const d = new Date();
    d.setHours(8, 0, 0, 0);
    return d;
  });
  const [endTime, setEndTime] = useState<Date | null>(() => {
    const d = new Date();
    d.setHours(23, 0, 0, 0);
    return d;
  });

  const [message, setMessage] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoadingState(false, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = createFormData(e);
    const validateInputs = formValidator(formData, workingHoursValidationSchema);
    console.log(formData);

    if (!validateInputs.status) {
      setMessage(validateInputs.message);
      return;
    }

    // Validate date range 
    let insertData;
    if(formData.start_date && formData.end_date) {
         if (new Date(formData.start_date) > new Date(formData.end_date)) {
      setMessage('Datum početka mora biti pre datuma završetka.');
      return;
    }

    // Validate time range: koristimo HH:mm stringove za poređenje
    const sTime = startTime ? format(startTime, 'HH:mm') : formData.start_time;
    const eTime = endTime ? format(endTime, 'HH:mm') : formData.end_time;
    if (sTime >= eTime) {
      setMessage('Vreme početka mora biti pre vremena završetka.');
      return;
    }
    insertData = {
      userId: loggedBarberId,
      start_date: startDate ? format(startDate, 'yyyy-MM-dd') : formData.start_date,
      end_date: endDate ? format(endDate, 'yyyy-MM-dd') : formData.end_date,
      start_time: sTime,
      end_time: eTime
    };
    } else {
        setMessage('Greška prilikomn unosa.');
        return;
    }
   

    

    setIsLoadingState(true, dispatch);
    const responseData = await insertItems(insertData, 'INSERT_WORKING_HOURS');
    const { success, data, message } = responseData as InsertUpdateWorkingHoursApiReturnType;
    if (!success) {
      setMessage(message);
      setIsLoadingState(false, dispatch);
      return;
    }
    data && workingHoursActiondispatcher(data, 'INSERT_WORKING_HOURS', dispatch);
    setMessage(message);
    form.reset();
    setIsLoadingState(false, dispatch);

    if (onSuccess) {
      onSuccess();
    }
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
      />

      <label>Datum do</label>
      <ReactDatePicker
        selected={endDate}
        onChange={(d: Date | null) => setEndDate(d)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Datum do"
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
      />

      <p className={message ? styles.message : ''}>{message}</p>

      <div>
        Izabrano: {formatTime(startTime)} — {formatTime(endTime)}
      </div>

      <button type="submit" className={styles.submitBtn}>DODAJ RADNO VREME</button>
    </form>
  );
};

export default InsertWorkingHoursForm;
*/
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

//const ReactDatePicker = dynamic(() => import('react-datepicker'), { ssr: false });


interface InsertWorkingHoursFormProps {
  loggedBarberId: number;
  onSuccess?: () => void;
}

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
