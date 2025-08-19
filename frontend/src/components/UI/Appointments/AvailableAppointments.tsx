'use client';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { appointmentActions } from '@/store/slices/appointmentSlice';
import { useAppDispatch } from '@/store/hooks/typizedHooks';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from './Appointments.module.css';
const AvailableAppointments: React.FC = () => {
    const {terms, selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    console.log(terms);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const queryString = useSearchParams().toString();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(appointmentActions.setSelectedTerm({...selectedTerm, time: e.currentTarget.innerText}));
        router.push(`/appointments/create?${queryString}`);
    };
    console.log(queryString);
    return (
        <ul className={`${styles.appointmentsUl} wrapp`}>
            {terms.map((term) => {
                return <li key={term}><button onClick={handleClick}>{term}</button></li>
            })}
        </ul>
    );
};
export default AvailableAppointments;