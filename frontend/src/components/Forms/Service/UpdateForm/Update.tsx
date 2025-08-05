"use client";
import { useState } from "react";
import Input from "../../Input/Input";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { uiActions } from "@/store/slices/UiSlice";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { createFormData } from "@/lib/utils/createFormData";
import { loginRegisterUpdate } from "@/lib/api/loginRegisterUpdate";
import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
import { serviceValidationSchema } from "@/lib/validators/validationSchema";
import { formValidator } from "@/lib/validators/formValidator";
import { serviceActionDispatcher } from "@/lib/utils/serviceActionDispatcher";
import styles from '../../Form.module.css';
import { SingleServiceType } from "@/types/Api/ReturnServiceType";



const Update: React.FC = () => {
    const [message, setMessage] = useState<string | undefined>('');
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
        console.log(validateData);
        if(!validateData.status) {
            setMessage(validateData.message);
        } 
        
        const data = {
            id: service?.id.toString()!,
            service: formData.service,
            price: formData.price,
           // description: formData.description
        }
        
        //const data = validateInputs
        dispatch(uiActions.setIsLoading(true));
        const response = await loginRegisterUpdate(apiRoutes.UPDATE_SERVICE, data, 'PATCH');
        if(!response?.success) {
            setMessage(response?.message);
            dispatch(uiActions.setIsLoading(false));
        }
        console.log(response);
        setMessage(response?.message || response?.data?.message);
        dispatch(uiActions.setIsLoading(false));
        
        response?.data?.data && serviceActionDispatcher(response?.data?.data, 'UPDATE', dispatch);
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={serviceInputs} />
            {/*<textarea name='description' defaultValue={service?.description}></textarea>*/}
            <p>{message}</p>
            <button type='submit'>POŠALJI</button>
        </form>
    );
};
export default Update;