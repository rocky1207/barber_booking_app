import { useState } from "react";
import Input from "../../Input/Input";
import { serviceInputs } from "@/datas/Form/lnputObjects";
import { serviceValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { useSearchParams } from "next/navigation";
import { insertItems } from "@/lib/api/insertItems";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { serviceActionDispatcher } from "@/lib/utils/serviceActionDispatcher";
import { InsertUpdateServiceReturnType } from "@/types/Api/ReturnServiceType";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import styles from '../../Form.module.css';


const Service: React.FC = () => {
    const {actionBarberId} = useAppSelector((state: RootState) => state?.barber);
    console.log(actionBarberId);
    const [message, setMessage] = useState<string>('');
    const params = useSearchParams();
    const userStrId = params.get('barberId');
    console.log(userStrId);
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
    let userId: number;
    if(!userStrId) {
    setMessage('ID frizera nije pronađen'); 
    return;
    } else {
    userId = parseInt(userStrId, 10);
    }
    const insertData = {
        service: formData.service,
        price: parseInt(formData.price, 10).toString(),
        userId
    }
    setIsLoadingState(true, dispatch);
    const responseData = await insertItems(insertData, 'INSERT_SERVICE');
    const {success, data, message, actionDone} = responseData as InsertUpdateServiceReturnType;
    
    if(!success) {
        setMessage(message);
        setIsLoadingState(false, dispatch);
        return;
    }
    setMessage(message);
    actionDone && serviceActionDispatcher(data, actionDone, dispatch);
    form.reset();
    setIsLoadingState(false, dispatch);
}
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={serviceInputs} />
            <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>POTVRDI</button>
        </form>
    );
}
export default Service;