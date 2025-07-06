import { useState } from "react";
import Input from "../Input/Input";
import { serviceInputs } from "@/datas/Form/lnputObjects";
import { serviceValidationSchema } from "@/lib/validators/validationSchema";
import { barberServiceBtn } from "@/datas/ButttonObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { useSearchParams } from "next/navigation";
import { addService } from "@/lib/api/service/addService";
import styles from '../Form.module.css';




const Service: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const params = useSearchParams();
    const userId = params.get('id');
    const id = userId !== null ? parseInt(userId, 10) : undefined;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = createFormData(e);
    console.log(formData);
    const validateForm = formValidator(formData, serviceValidationSchema);
    if(!validateForm.status) {
        setMessage(validateForm.message);
        return;
    }
    const data = {
        service: formData.service,
        description: formData.description,
        price: parseInt(formData.price, 10),
        userId: id!
    }
    console.log(data);
    addService('service/addService.php', data)
    
}

console.log(message);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={serviceInputs} />
            <textarea name="description" defaultValue='' placeholder='Opis'  id=""></textarea>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
    );
}
export default Service;