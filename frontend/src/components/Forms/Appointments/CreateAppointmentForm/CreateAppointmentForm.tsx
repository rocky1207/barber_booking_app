'use client';
import Input from "../../Input/Input";
import { appointmentInputs } from "@/datas/Form/lnputObjects";
import styles from '../../Form.module.css';
const CreateAppointment: React.FC = () => {
 return (
    <form className={styles.form}> 
        <Input inputs={appointmentInputs} />
        <button type="submit">POTVRDI</button>
    </form>
 );
};
export default CreateAppointment;