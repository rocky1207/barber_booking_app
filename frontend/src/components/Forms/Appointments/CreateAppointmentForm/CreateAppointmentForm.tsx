'use client';
import { useState } from "react"; 
import Input from "../../Input/Input";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { appointmentInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { appointmentValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { createAppointment } from "@/lib/api/appointments/createAppointment";
import { formatTime } from "@/lib/utils/formatTime";
import styles from '../../Form.module.css';
const CreateAppointment: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
        
    console.log(choosenServices.length);
    console.log(selectedTerm);
    const timeData = formatTime(selectedTerm.time, choosenServices.length);

    
    const services = choosenServices.map((service, i) => {
        const appointmentTime = `${timeData[i].hour.toString()}:${timeData[i].minutes.toString().padStart(2, '0')}`;
        
        return {
            serviceId: service.id,
            date: selectedTerm.date,
            time: appointmentTime
        }
    });
    
    const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        
        createAppointment('INSERT', data);
        form.reset();
    }
 return (
    <form className={styles.form} onSubmit={handleSubmmit}> 
        <Input inputs={appointmentInputs} />
        <p>{message}</p>
        <button type="submit">POTVRDI</button>
    </form>
 );
};
export default CreateAppointment;