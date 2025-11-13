import { useRef } from 'react';
import BarberAppointment from './BarberAppointment';
import { BarberAppointmentsType } from '@/types/Appointments/AppointmentsType';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
//import { deleteBarberBtn } from '@/datas/ButttonObjects';
import { deleteBtn } from '@/datas/ButttonObjects';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
//import { deleteClientAppointment } from '@/lib/api/appointments/deleteClientAppointment';

import { deleteItemsById } from '@/lib/api/deleteItemsById';
import styles from './Appointments.module.css';
const BarberAppointments: React.FC<{appointments: BarberAppointmentsType[]}> = ({appointments}) => {
    const {actionAppointmentId} = useAppSelector((state: RootState) => state.appointment);
    const dialog = useRef<HTMLDialogElement | null>(null);
    const deleteAppointmentBtn = {
            //...deleteBarberBtn,
            ...deleteBtn,
            //head: 'DA LI STE SIGURNI?',
            id: actionAppointmentId,
            action: 'DELETE_BARBER_APPOINTMENT',
            //onAction: deleteClientAppointment
            onAction: deleteItemsById
        }
    return (
        <>
        <ConfirmModal ref={dialog} {...deleteAppointmentBtn} />
        <section className={styles.clientAppointment}>
        <ul>
            {appointments?.map((appointment) => {
                return <BarberAppointment key={appointment.time} appointment={appointment} ref={dialog} />
            })}
        </ul>
        </section>
        </>
    )
}
export default BarberAppointments;