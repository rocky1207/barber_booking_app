import { useState, useEffect } from 'react';
import { BarberAppointmentsType } from '@/types/Appointments/AppointmentsType';
import { formatPrice } from "@/lib/utils/formatPrice";
import NavigateButton from '@/components/Button/NavigateButton';
import { modalActionBtn } from '@/datas/ButttonObjects';
import { useAppDispatch, useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { appointmentActions } from '@/store/slices/appointmentSlice';
import { forwardRef } from 'react';
import styles from './Appointments.module.css';
import { uiActions } from '@/store/slices/uiSlice';

const BarberAppointment = forwardRef<HTMLDialogElement, {appointment: BarberAppointmentsType}>(({appointment}, ref) => {
    const [deleteBarberAppointmentMsg, setDeleteBarberAppointmentMsg] = useState<string>('');
    const {loggedBarber, actionBarberId} = useAppSelector((state: RootState) => state?.barber);
    const {actionAppointmentId} = useAppSelector((state: RootState) => state?.appointment);
    const {deleteItemErrorMessage} = useAppSelector((state: RootState) => state?.ui);
    const {appointmentId, name, surname, phone, userService, time} = appointment;
    const updatedPrice = formatPrice(appointment.price);
    console.log(appointment);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(deleteItemErrorMessage.delete_barber_appointment !== '') {
            setDeleteBarberAppointmentMsg(deleteItemErrorMessage.delete_barber_appointment);
            dispatch(uiActions.setDeleteItemErrorMessage({...deleteItemErrorMessage, delete_barber_appointment: ''}));
        }
    }, [deleteItemErrorMessage.delete_barber_appointment]);
    const openModal = () => {
        dispatch(appointmentActions.setActionAppointmentId(appointment.appointmentId));
        if(ref && typeof ref !== 'function' && ref.current) ref.current.showModal();
    }
    const updatedModalActionBtn = {
        ...modalActionBtn,
        text: 'OTKAŽI TERMIN',
        onAction: openModal
    }
    return (
        <li>
            <div className="cardDashboard">
            <div className={styles.info}>
                <p>Klijent : <span>{`${name} ${surname}`}</span></p>
                <p>Telefon: <span>{phone}</span></p>
                <p>Usluga: <span>{userService}</span></p>
                <p>Cena usluge: <span>{updatedPrice}din.</span></p>
                <p>Vreme: <span>{time}</span></p>
            </div>
            {loggedBarber?.id === actionBarberId && <nav className={styles.action}>
                <NavigateButton {...updatedModalActionBtn} />
            </nav>}
            </div>
            {actionAppointmentId === appointmentId && <p>{deleteBarberAppointmentMsg}</p>}
        </li>
    )
});
export default BarberAppointment;