'use client';
import { useRef } from "react";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { formatDate } from "@/lib/utils/formatDate";
import { formatPrice } from "@/lib/utils/formatPrice";
import ClientAppointment from "./ClientAppointment";
import { deleteBarberBtn} from "@/datas/ButttonObjects";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { deleteClientAppointment } from "@/lib/api/appointments/deleteClientAppointment";
import styles from './Appointments.module.css';
const ClientAppointments: React.FC = () => {
    const {clientTerms, actionAppointmentId} = useAppSelector((state: RootState) => state.appointment);
    console.log(clientTerms);
    const dialog = useRef<HTMLDialogElement | null>(null);
    
    
    const deleteleAppointmentBtn = {
        ...deleteBarberBtn,
        id: actionAppointmentId,
        action: 'DELETE_APPOINTMENT',
        onAction: deleteClientAppointment
    }
    
    return (
        <>
        < ConfirmModal ref={dialog} {...deleteleAppointmentBtn}/>
        <section className={styles.clientAppointment}>
        <h2>{clientTerms[0]?.name} {clientTerms[0]?.surname}</h2>
        <ul>
            { clientTerms.map((term) => {
                const date = formatDate(new Date(term.date));
                const time = term.time.split(':').slice(0, 2).join(':');
                const servicePrice = formatPrice(term.servicePrice);
                const termData = {
                    ...term,
                    date,
                    time,
                    servicePrice
                }
                return (
                    <ClientAppointment key={termData.appointmentId} termData={termData} ref={dialog} />
                );
            })}
        </ul>
        </section>
        </>
    );
};
export default ClientAppointments;