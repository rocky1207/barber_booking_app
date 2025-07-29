"use client";
import Input from "../../Input/Input";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import styles from '../../Form.module.css';
import { createFormData } from "@/lib/utils/createFormData";
import { loginRegisterUpdate } from "@/lib/api/loginRegisterUpdate";
import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";

const Update: React.FC = () => {
    const {services} = useAppSelector((state: RootState) => state?.service);
    const params = useSearchParams();
    const strId = params.get('serviceId');
    const serviceId = strId ? parseInt(strId, 10) : null;
    const service = services.find(item => item.id === serviceId);
    console.log(service);
    const servicePrice = parseInt(service?.price!, 10).toString();
    const serviceInputs = [
        {type: 'text', name: 'service', defaultValue: service?.userService, placeholder: "Usluga"},
        {type: 'text', name: 'price', defaultValue: servicePrice, placeholder: "Cena"},
    ]
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const formData = createFormData(e);
        console.log(formData);
        const data = {
            id: service?.id.toString()!,
            service: formData.service,
            price: formData.price,
            description: formData.description
        }
        console.log(data);
        const response = loginRegisterUpdate(apiRoutes.UPDATE_SERVICE, data, 'PATCH');
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={serviceInputs} />
            <textarea name='description' defaultValue={service?.description}></textarea>
            <button type='submit'>POŠALJI</button>
        </form>
    );
};
export default Update;