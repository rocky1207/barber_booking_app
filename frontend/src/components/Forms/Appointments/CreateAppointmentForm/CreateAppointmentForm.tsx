'use client';
import { useState, useEffect, useRef } from "react"; 
import { useRouter } from "next/navigation";
import Input from "../../Input/Input";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { appointmentInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { appointmentValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { postAppointmentApi } from "@/lib/api/appointments/postAppointmentApi";
import { formatTime } from "@/lib/utils/formatTime";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { appointmentActionDispatcher } from "@/lib/utils/appointmentActionDispatcher";
import NewAppointmentModal from "@/components/UI/NewAppointmentModal/NewAppointmentModal";
import styles from '../../Form.module.css';
const CreateAppointment: React.FC = () => {
    const dialog = useRef<HTMLDialogElement | null>(null);
    const [message, setMessage] = useState<string>('');
    const [dialogData, setDialogData] = useState<{date: string, time: string}>({date: '', time: ''});
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const dispatch = useAppDispatch();
    const router = useRouter();
    console.log(choosenServices.length);
    console.log(selectedTerm);
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
        setIsLoadingState(true, dispatch);
        const form = e.currentTarget;
        const formData = createFormData(e);
        const validateInputs = formValidator(formData, appointmentValidationSchema);
        
        console.log(formData);
        console.log(validateInputs); 
        if(!validateInputs.status) {setMessage(validateInputs.message); return;}

        //setMessage('Uspešno ste zakazali termin.');
        const data = {
            userId: choosenServices[0].userId,
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            email: formData.email,
            services
        }
        
        const response = await postAppointmentApi('INSERT', data);
        if(!response.success) {
            setMessage(response.message);
            setIsLoadingState(false, dispatch);
            return;
        }
        if(!response.data) {
            setMessage('Neočekivan format odgovora sa servera.');
            setIsLoadingState(false, dispatch);
            return;
        }
        console.log(response);
        //setMessage(response.message);
        
        appointmentActionDispatcher(response?.data, 'INSERT', dispatch);
        
        setDialogData({
            date: response.data.date,
            time: response.data.startAppointment,
        });
        localStorage.setItem('appointmentSuccess', JSON.stringify({
            date: response.data.date,
            time: response.data.startAppointment,
        }));
        form.reset();
        setIsLoadingState(false, dispatch);
        if(dialog && typeof dialog !== "function" && dialog.current) dialog.current.showModal();
    }
console.log(dialogData);
    
 return (
    <>
    <NewAppointmentModal ref={dialog} {...dialogData} />
    <form className={styles.form} onSubmit={handleSubmmit}> 
        <Input inputs={appointmentInputs} />
        <p>{message}</p>
        <button type="submit">POTVRDI</button>
    </form>
    </>
 );
};
export default CreateAppointment;