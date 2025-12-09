'use client';
import { useState, useEffect, useRef } from "react"; 
import Input from "../../Input/Input";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { appointmentInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { appointmentValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { insertItems } from "@/lib/api/insertItems";
import { formatTime } from "@/lib/utils/formatTime";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { InsertAppointmentApiReturnType } from "@/types/Appointments/AppointmentsType";
import NewAppointmentModal from "@/components/UI/Modals/NewAppointmentModal/NewAppointmentModal";
import styles from '../../Form.module.css';

const CreateAppointment: React.FC = () => {
    const dialog = useRef<HTMLDialogElement | null>(null);
    const [message, setMessage] = useState<string>('');
    const [dialogData, setDialogData] = useState<{date: string, time: string}>({date: '', time: ''});
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setIsLoadingState(false, dispatch);
        const getAppointmentSuccess = localStorage.getItem('appointmentSuccess');
        if(getAppointmentSuccess) {
            try {
                const data = JSON.parse(getAppointmentSuccess);
                setDialogData(data);
                if(dialog && typeof dialog !== 'function' && dialog.current) dialog.current.showModal();
            } catch {}
        }
    }, []);
    const timeData = formatTime(selectedTerm.time, choosenServices.length);
    const services = choosenServices.map((service, i) => {
        // Use the timeString from the improved formatTime function
        const appointmentTime = timeData[i].timeString;
        return {
            serviceId: service.id,
            date: selectedTerm.date,
            time: appointmentTime
        }
    });
    
    const handleSubmmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = createFormData(e);
        const validateInputs = formValidator(formData, appointmentValidationSchema);
        
        if(!validateInputs.status) {setMessage(validateInputs.message); return;}
        const newData = {
            userId: choosenServices[0].userId,
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            email: formData.email,
            services
        }
        setIsLoadingState(true, dispatch);
        const responseData = await insertItems(newData, 'INSERT_CLIENT_APPOINTMENT');
        const {success, data, message, actionDone } = responseData as InsertAppointmentApiReturnType;
        if(!success) {
            setMessage(message);
            setIsLoadingState(false, dispatch);
            return;
        }
        if(actionDone === 'INSERT_CLIENT_APPOINTMENT') {
            const insertData = data as { date: string; startAppointment: string };
            setDialogData({
                date: insertData.date,
                time: insertData.startAppointment,
            });
            localStorage.setItem('appointmentSuccess', JSON.stringify({
                date: insertData.date,
                time: insertData.startAppointment,
            }));
        }
        form.reset();
        setIsLoadingState(false, dispatch);
        if(dialog && typeof dialog !== "function" && dialog.current) dialog.current.showModal();
    }
    return (
        <>
        <NewAppointmentModal ref={dialog} {...dialogData} />
        <form className={styles.form} onSubmit={handleSubmmit}> 
            <Input inputs={appointmentInputs} />
            <p>{message}</p>
            <button className={styles.submitBtn} type="submit">POTVRDI</button>
        </form>
        </>
 );
};
export default CreateAppointment;