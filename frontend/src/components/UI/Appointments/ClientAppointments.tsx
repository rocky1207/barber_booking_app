'use client';
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { formatDate } from "@/lib/utils/formatDate";
import { formatPrice } from "@/lib/utils/formatPrice";
import ClientAppointment from "./ClientAppointment";
import { deleteBtn } from "@/datas/ButttonObjects";
import ConfirmModal from "../Modals/ConfirmModal/ConfirmModal";
import { deleteItemsById } from "@/lib/api/deleteItemsById";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import styles from './Appointments.module.css';

const ClientAppointments: React.FC = () => {
    const {clientTerms, actionAppointmentId} = useAppSelector((state: RootState) => state.appointment);
    const dialog = useRef<HTMLDialogElement | null>(null);
    const dispatch = useAppDispatch();
    const deleteAppointmentBtn = {
         ...deleteBtn,
        id: actionAppointmentId,
        action: 'DELETE_CLIENT_APPOINTMENT',
        onAction: deleteItemsById
    };
    useEffect(() => {setIsLoadingState(false, dispatch)}, [clientTerms]);
    
    return (
        <>
        <ConfirmModal ref={dialog} {...deleteAppointmentBtn}/>
        <section className={styles.clientAppointment}>
        <h2>{clientTerms[0]?.name} {clientTerms[0]?.surname}</h2>
        <ul>
            {clientTerms.map((term) => {
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