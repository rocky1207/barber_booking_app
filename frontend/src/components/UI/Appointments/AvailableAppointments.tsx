'use client';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import styles from './Appointments.module.css';
const AvailableAppointments: React.FC = () => {
    const {terms} = useAppSelector((state: RootState) => state?.appointment);
    console.log(terms);
    return (
        <ul className={`${styles.appointmentsUl} wrapp`}>
            {terms.map((term) => {
                return <li key={term}>{term}</li>
            })}
        </ul>
    );
};
export default AvailableAppointments;