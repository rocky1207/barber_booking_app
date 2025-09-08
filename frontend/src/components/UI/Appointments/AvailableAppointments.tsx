'use client';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { appointmentActions } from '@/store/slices/appointmentSlice';
import { useAppDispatch } from '@/store/hooks/typizedHooks';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';
import { formatTime } from '@/lib/utils/formatTime';
import { getReservedAppointments } from '@/lib/api/appointments/getReservedAppointments';
import styles from './Appointments.module.css';

const AvailableAppointments: React.FC = () => {
    const {terms, selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    console.log(terms);
    console.log(selectedTerm);
    useEffect(() => {
       getReservedAppointments(selectedTerm.date); 
    }, [selectedTerm.date]);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const queryString = useSearchParams().toString();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoadingState(true, dispatch);
        dispatch(appointmentActions.setSelectedTerm({...selectedTerm, time: e.currentTarget.innerText}));
        router.push(`/appointments/create?${queryString}`);
    };
    const bla = formatTime(selectedTerm.time, choosenServices.length);
    console.log(bla);
    
    return (
        <ul className={`${styles.appointmentsUl} wrapp`}>
            {terms.map((term) => {
                return term !== selectedTerm.time ? <li key={term}><button onClick={handleClick}>{term}</button></li> : 
                <li key={term} className={styles.liDisabled}><button className={styles.buttonDisabled} disabled>{term}</button></li>
            })}
        </ul>
    );
};
export default AvailableAppointments;