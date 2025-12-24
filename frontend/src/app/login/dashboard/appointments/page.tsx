"use client";
import { useEffect, useState } from "react";
import CalendarBarber from "@/components/UI/Appointments/CalendarBarber";
import BarberAppointments from "@/components/UI/Appointments/BarberAppointments";
import Header from "@/components/UI/Header/Header";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { appointmentActions } from "@/store/slices/appointmentSlice";
import { getItemsByUserId } from "@/lib/api/getItemsByUserId";
import { GetBarberAppointmentsReturnDataType } from "@/types/Api/ReturnAppointmentType";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { clientsHeaderNav } from "@/datas/NavigationObjects";
import styles from '@/components/UI/Appointments/Appointments.module.css';
import 'react-day-picker/dist/style.css';


const AppointmentsPage: React.FC =  () => {
    const [message, setMessage] = useState<string>('Nema retultata za navedeni datum.');
    const {barberTerms, selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
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
                const responseData = await getItemsByUserId(data, 'GET_BARBER_APPOINTMENTS');
                const response = responseData as GetBarberAppointmentsReturnDataType;
                if(!response.success) {
                    setMessage(response.message);
                    setIsLoadingState(false, dispatch);
                    return;
                } 
                const dataArr = response.data ?? [];
                if(dataArr.length === 0) {
                    dispatch(appointmentActions.setBarberTerms([]));
                    setMessage('Nema rezultata za izabrani datum.');
                } else {
                    dispatch(appointmentActions.setBarberTerms(dataArr));
                    setMessage('');
                }
            } catch (error: any) {
                setMessage(error?.message || 'Nepoznata greška.');
            }
            setIsLoadingState(false, dispatch);
        }
        getApp();
    }, [selectedTerm.date, actionBarberId]);
    const appointmentsPageNav = {
        ...clientsHeaderNav,
        liItem: [{...clientsHeaderNav.liItem[0], text: 'MENADŽERSKA TABLA', link: '/login/dashboard'}]
    }
    
    return (
        <>
        <Header>
            <ClientNavigation {...appointmentsPageNav} />
        </Header>
        <main className="wrapp">
            <h1 className={`margin-bottom ${styles.elH1}`}>ZAKAZANI TERMINI</h1>
            <section className="middle">
                <CalendarBarber />
            </section>
            <div className={styles.barberAppointmentsHeadDiv}>
                <h3>Frizer: <span>{selectedBarber[0].username}</span></h3>
                <h4>Datum: {selectedTerm.date}</h4>
            </div>
            <BarberAppointments appointments={barberTerms} />
            <p className='middle'>{message}</p>
        </main>
        </>
    );
};
export default AppointmentsPage;