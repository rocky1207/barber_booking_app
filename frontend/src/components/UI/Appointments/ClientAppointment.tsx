import NavigateButton from "@/components/Button/NavigateButton";
import { forwardRef } from "react";
import { modalActionBtn} from "@/datas/ButttonObjects";
import { ClientAppointmentsSliceType } from "@/types/Appointments/AppointmentsType";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { appointmentActions } from "@/store/slices/appointmentSlice";
import styles from './Appointments.module.css'
const ClientAppointment = forwardRef<HTMLDialogElement, {termData: ClientAppointmentsSliceType}>(({termData}, ref) => {
    const {appointmentId, barber, date, time, serviceName, servicePrice} = termData;
    const dispatch =  useAppDispatch();
    const openModal = () => {
        dispatch(appointmentActions.setActionAppointmentId(appointmentId));
        if(ref && typeof ref !== 'function' && ref.current) ref.current.showModal();
    }
    const updatedModalActionBtn = {
        ...modalActionBtn,
        text: 'OTKAŽI TERMIN',
        onAction: openModal
    }
    return (
        <li className="flexed">
                        <div className={styles.info}>
                            <h3>Frizer: {barber}</h3>
                            <p>Datum: {date}</p>
                            <p>Vreme: {time}h</p>
                            <p>Usluga: {serviceName}</p>
                            <p>Cena: {servicePrice}din.</p>
                        </div>
                        <nav className={styles.action}>
                            <NavigateButton {...updatedModalActionBtn} />
                        </nav>
                    </li>
    );

});
export default ClientAppointment;