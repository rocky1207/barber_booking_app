"use client";
//import Header from "@/components/UI/Header/Header";
import { useEffect } from "react";
import Calendar from "@/components/UI/Appointments/Calendar";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
//import { useSearchParams } from "next/navigation";
import { getBarberAppointmentsByDate } from "@/lib/api/appointments/getBarberAppointmentsByDate";
import 'react-day-picker/dist/style.css';
const AppointmentsPage: React.FC =  () => {
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const {actionBarberId} = useAppSelector((state: RootState) => state?.barber);
    console.log(selectedTerm);
    /*
    const params = useSearchParams();
    const strBarberId = params.get('barberId');
    const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
    */
    console.log(actionBarberId);
    const data = {date: selectedTerm.date, id: actionBarberId!};
    useEffect(() => {
        console.log('ušlo');
        getBarberAppointmentsByDate(data);
    }, [selectedTerm.date, actionBarberId]);
    
    return (
        <>
        <main className="wrapp">
            <h1>ZAKAZANI TERMINI</h1>
            <Calendar />
            <h3>Frizer: <span>Đole</span></h3>
        </main>
        </>
    );
};
export default AppointmentsPage;