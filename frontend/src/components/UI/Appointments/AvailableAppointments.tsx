'use client';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { appointmentActions } from '@/store/slices/appointmentSlice';
import { useAppDispatch } from '@/store/hooks/typizedHooks';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';
import { getReservedAppointments } from '@/lib/api/appointments/getReservedAppointments';
import styles from './Appointments.module.css';

const AvailableAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<string[]>([]);
    const {terms, selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    console.log(terms[0]);
    console.log(JSON.stringify(terms)); 
    console.log(selectedTerm);
    
    useEffect(() => {
        const getAppointments = async () => {
            const data = await getReservedAppointments({userId: choosenServices[0].userId, date: selectedTerm.date});
            if (data?.data) {
                setAppointments(data.data);
            } 
        }
        getAppointments();
    }, [selectedTerm.date]);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const queryString = useSearchParams().toString();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoadingState(true, dispatch);
        dispatch(appointmentActions.setSelectedTerm({...selectedTerm, time: e.currentTarget.innerText}));
        router.push(`/appointments/create?${queryString}`);
    };
    
    
    const shortTime = appointments?.map(app => app.substring(0, 5));
console.log(shortTime);
    
    return (
        <ul className={`${styles.appointmentsUl} wrapp`}>
            {terms.map((term) => {
                let newTerm = term;
                if(term[0] === '9') newTerm = `0${term}`;
                return !shortTime?.includes(newTerm) ? <li key={term}><button onClick={handleClick}>{term}</button></li> : 
                <li key={term} className={styles.liDisabled}><button className={styles.buttonDisabled} disabled>{term}</button></li>
            })}
        </ul>
    );
};
export default AvailableAppointments;