"use client";
import { useEffect, useState } from "react";
import Calendar from "@/components/UI/Appointments/Calendar";
import BarberAppointments from "@/components/UI/Appointments/BarberAppointments";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { getBarberAppointments } from "@/lib/api/appointments/getBarberAppointments";
import { BarberAppointmentsType } from "@/types/Appointments/AppointmentsType";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import styles from '@/components/UI/Appointments/Appointments.module.css';
import 'react-day-picker/dist/style.css';


const AppointmentsPage: React.FC =  () => {
    const [appointments, setAppointments] = useState<BarberAppointmentsType[]>([]);
    const [message, setMessage] = useState<string>('');
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const {actionBarberId, barbers} = useAppSelector((state: RootState) => state?.barber);
    const dispatch = useAppDispatch();
    const selectedBarber = barbers?.filter(barber => barber.id === actionBarberId);
    useEffect(() => {
        if (!selectedTerm?.date) return;
        if (!actionBarberId) return;
        const data = {userId: actionBarberId, date: selectedTerm.date};
        const getApp = async () => {
            setIsLoadingState(true, dispatch);
            try {
                const response = await getBarberAppointments(data);
                if(!response.success) {
                    setMessage(response.message);
                    setIsLoadingState(false, dispatch);
                    return;
                } 
                const dataArr = response.data ?? [];
                if(dataArr.length === 0) {
                    setAppointments([]);
                    setMessage('Nema rezultata za izabrani datum.');
                } else {
                    setAppointments(dataArr);
                    setMessage('');
                }
            } catch (error: any) {
                setMessage(error?.message || 'Nepoznata greška.');
            }
            setIsLoadingState(false, dispatch);
        }
        getApp();
    }, [selectedTerm.date, actionBarberId]);
    const navigationData = {navClass: 'wrapp', ulClass: '', liItem: [{text: 'dashboard', itemClass: '', link: '/login/dashboard'}]};
    return (
        <>
        <PageNavigation {...navigationData} />
        <main className="wrapp">
            <h1>ZAKAZANI TERMINI</h1>
            <section className="middle">
                <Calendar />
            </section>
            <div className={styles.barberAppointmentsHeadDiv}>
            <h3>Frizer: <span>{selectedBarber[0].username}</span></h3>
            <h4>Datum: {selectedTerm.date}</h4>
            </div>
            <BarberAppointments appointments={appointments} />
            <p className='middle'>{message}</p>
        </main>
        </>
    );
};
export default AppointmentsPage;