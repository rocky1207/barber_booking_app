import { useState, useEffect } from "react";
import NavigateButton from "@/components/Button/NavigateButton";
import { forwardRef } from "react";
import { modalActionBtn} from "@/datas/ButttonObjects";
import { ClientAppointmentsSliceType } from "@/types/Appointments/AppointmentsType";
import { useAppDispatch, useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { appointmentActions } from "@/store/slices/appointmentSlice";
import { uiActions } from "@/store/slices/uiSlice";
import styles from './Appointments.module.css';

const ClientAppointment = forwardRef<HTMLDialogElement, {termData: ClientAppointmentsSliceType}>(({termData}, ref) => {
    const [deleteClientAppointmentMsg, setDeleteClientApppointmentMsg] = useState<string>('');
    const {deleteItemErrorMessage} = useAppSelector((state: RootState) => state?.ui);
    const {appointmentId, barber, date, time, serviceName, servicePrice} = termData;
    const {actionAppointmentId} = useAppSelector((state: RootState) => state?.appointment);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(deleteItemErrorMessage.delete_client_appointment !== '') {
            setDeleteClientApppointmentMsg(deleteItemErrorMessage.delete_client_appointment);
            dispatch(uiActions.setDeleteItemErrorMessage({...deleteItemErrorMessage, delete_client_appointment: ''}));
        }
    }, [deleteItemErrorMessage.delete_client_appointment]);
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
        <li className={`cardDashboard`}>
            <div>
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
            </div>
            {actionAppointmentId === appointmentId  && <p>{deleteClientAppointmentMsg}</p>}
        </li>
    );

});
export default ClientAppointment;