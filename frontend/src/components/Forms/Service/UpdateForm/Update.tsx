"use client";
import { useState } from "react";
import Input from "../../Input/Input";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { createFormData } from "@/lib/utils/createFormData";
import { updateItems } from "@/lib/api/updateItems";
import { serviceValidationSchema } from "@/lib/validators/validationSchema";
import { formValidator } from "@/lib/validators/formValidator";
import { serviceActionDispatcher } from "@/lib/utils/serviceActionDispatcher";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { InsertUpdateServiceReturnType } from "@/types/Api/ReturnServiceType";
import styles from '../../Form.module.css';

const Update: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const {services} = useAppSelector((state: RootState) => state?.service);
    const dispatch = useAppDispatch();
    const params = useSearchParams();
    const strId = params.get('serviceId');
    const serviceId = strId ? parseInt(strId, 10) : null;
    const service = services.find(item => item.id === serviceId);
    console.log(service);
    const servicePrice = service?.price.replace(/\./g, '').replace(/,\d{2}$/, '');
    console.log(servicePrice);
    const serviceInputs = [
        {type: 'text', name: 'service', defaultValue: service?.userService, placeholder: "Usluga"},
        {type: 'text', name: 'price', defaultValue: servicePrice, placeholder: "Cena"},
    ]
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const formData = createFormData(e);
        const validateData = formValidator(formData, serviceValidationSchema);
        if(!validateData.status) {
            setMessage(validateData.message);
        } 
        const updateData = {
            id: service?.id.toString()!,
            service: formData.service,
            price: formData.price,
        }
        
        setIsLoadingState(true, dispatch);
        const responseData = await updateItems(updateData, 'UPDATE_SERVICE');
        const {success, data, message, actionDone} = responseData as InsertUpdateServiceReturnType;
        console.log(data);
        if(!success) {
            setMessage(message);
             setIsLoadingState(false, dispatch);
        }
        
        setMessage(message);
        setIsLoadingState(false, dispatch);
        actionDone && serviceActionDispatcher(data, actionDone, dispatch);
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={serviceInputs} />
             <p>{message}</p>
            <button type='submit'>POŠALJI</button>
        </form>
    );
};
export default Update;