import { useState } from "react";
import Input from "../Input/Input";
import { serviceInputs } from "@/datas/Form/lnputObjects";
import { serviceValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { useSearchParams } from "next/navigation";
import { insertService } from "@/lib/api/service/insertService";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { serviceActionDispatcher } from "@/lib/utils/serviceActionDispatcher";
import styles from '../Form.module.css';

const Service: React.FC = () => {
    const [message, setMessage] = useState<string | undefined>('');
    const params = useSearchParams();
    const userId = params.get('barberId');
    const id = userId !== null ? parseInt(userId, 10) : undefined;
    const dispatch = useAppDispatch();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = createFormData(e);
    const validateInputs = formValidator(formData, serviceValidationSchema);
    if(!validateInputs.status) {
        setMessage(validateInputs.message);
        return;
    }
    const data = {
        service: formData.service,
        description: formData.description,
        price: parseInt(formData.price, 10),
        userId: id!
    }
    setIsLoadingState(true, dispatch);
    const response = await insertService('INSERT',  data);
    
    
    if(!response.success) {
        setMessage(response.message);
        setIsLoadingState(false, dispatch);
        return;
    }
    if (!response.data) {
        setMessage("Neočekivani format odgovora sa servera.");
        setIsLoadingState(false, dispatch);
        return;
    }
    setMessage(response.message);
    serviceActionDispatcher(response.actionDone!.toUpperCase(), response.data, dispatch);
    setIsLoadingState(false, dispatch);
    form.reset();
}
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={serviceInputs} />
            <textarea name="description" defaultValue='' placeholder='Opis'></textarea>
            <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
    );
}
export default Service;