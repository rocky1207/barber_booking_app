import { BarberAppointmentsType } from '@/types/Appointments/AppointmentsType';
import { formatPrice } from "@/lib/utils/formatPrice";
import NavigateButton from '@/components/Button/NavigateButton';
import { modalActionBtn } from '@/datas/ButttonObjects';
import { useAppDispatch, useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { appointmentActions } from '@/store/slices/appointmentSlice';
import { forwardRef } from 'react';
import styles from './Appointments.module.css';

const BarberAppointment = forwardRef<HTMLDialogElement, {appointment: BarberAppointmentsType}>(({appointment}, ref) => {
    const {loggedBarber, actionBarberId} = useAppSelector((state: RootState) => state.barber);
    const updatedPrice = formatPrice(appointment.price);
    const dispatch = useAppDispatch();
    const openModal = () => {
        console.log('open');
        dispatch(appointmentActions.setActionAppointmentId(appointment.appointmentId));
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
                <p>Klijent : <span>{`${appointment.name} ${appointment.surname}`}</span></p>
                <p>Telefon: <span>{appointment.phone}</span></p>
                <p>Usluga: <span>{appointment.userService}</span></p>
                <p>Cena usluge: <span>{updatedPrice}din.</span></p>
                <p>Vreme: <span>{appointment.time}</span></p>
            </div>
            {loggedBarber?.id === actionBarberId && <nav className={styles.action}>
                <NavigateButton {...updatedModalActionBtn} />
            </nav>}
        </li>
    )
});
export default BarberAppointment;