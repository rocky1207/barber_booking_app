import { useState } from "react";
import Input from "../../Input/Input";
import { serviceInputs } from "@/datas/Form/lnputObjects";
import { serviceValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { useSearchParams } from "next/navigation";
//import { insertService } from "@/lib/api/service/insertService";
import { insertItems } from "@/lib/api/insertItems";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { serviceActionDispatcher } from "@/lib/utils/serviceActionDispatcher";
import styles from '../../Form.module.css';
//import { loginRegisterUpdate } from "@/lib/api/loginRegisterUpdate";
import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
//import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { InsertUpdateServiceReturnType } from "@/types/Api/ReturnServiceType";

const Service: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const params = useSearchParams();
    const userStrId = params.get('barberId');
   // const id = userId !== null ? parseInt(userId, 10) : 0;
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
    /*
    const data = {
        service: formData.service,
        description: formData.description,
        price: parseInt(formData.price, 10),
        userId: id!
    }
        */
       let userId: number;
       if(!userStrId) {
        setMessage('ID frizera nije pronađen'); 
        return;
       } else {
        userId = parseInt(userStrId, 10);
       }
       
    const insertData = {
        service: formData.service,
       // description: formData.description,
        price: parseInt(formData.price, 10).toString(),
        userId
    }
    setIsLoadingState(true, dispatch);
   // const response = await insertService('INSERT',  data);
    //const responseData = await loginRegisterUpdate(apiRoutes.INSERT_SERVICE, data, 'POST');
    const responseData = await insertItems(insertData, 'INSERT_SERVICE');
    const {success, data, message, actionDone} = responseData as InsertUpdateServiceReturnType;
    
    if(!success) {
        setMessage(message);
        setIsLoadingState(false, dispatch);
        return;
    }
    /*
    if (!response.data) {
        setMessage("Neočekivani format odgovora sa servera.");
        setIsLoadingState(false, dispatch);
        return;
    }
        */
    setMessage(message);
    actionDone && serviceActionDispatcher(data, actionDone, dispatch);
    form.reset();
    setIsLoadingState(false, dispatch);
}
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={serviceInputs} />
            {/*<textarea name="description" defaultValue='' placeholder='Opis'></textarea>*/}
            <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
    );
}
export default Service;