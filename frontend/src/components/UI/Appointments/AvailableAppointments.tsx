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
import { calculateAvailableTimeSlots } from '@/lib/utils/calculateAvailableAppointments';
import { normalizeTimeString } from '@/lib/utils/timeUtils';
import styles from './Appointments.module.css';


const AvailableAppointments: React.FC = () => {
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    
    const dispatch = useAppDispatch();
    const router = useRouter();
    const queryString = useSearchParams().toString();
    
    useEffect(() => {
        const fetchAvailableSlots = async () => {
            // Don't fetch if no date selected or no services chosen
            if (!selectedTerm.date || choosenServices.length === 0) {
                setAvailableSlots([]);
                return;
            }
            
            setIsLoading(true);
            try {
                const reservedAppointments = await getReservedAppointments({
                    userId: choosenServices[0].userId, 
                    date: selectedTerm.date
                });
                
                if (reservedAppointments.success && reservedAppointments.data) {
                    const slots = calculateAvailableTimeSlots(
                        reservedAppointments.data, 
                        {
                            serviceCount: choosenServices.length,
                            slotDuration: 30,
                            bufferTime: 0
                        }
                    );
                    setAvailableSlots(slots);
                } else {
                    console.error('Failed to fetch reserved appointments:', reservedAppointments.message);
                    setAvailableSlots([]);
                }
            } catch (error) {
                console.error('Error fetching available slots:', error);
                setAvailableSlots([]);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchAvailableSlots();
    }, [selectedTerm.date, choosenServices]);
    
    const handleSlotClick = (timeSlot: string) => {
        setIsLoadingState(true, dispatch);
        dispatch(appointmentActions.setSelectedTerm({
            ...selectedTerm, 
            time: normalizeTimeString(timeSlot)
        }));
        router.push(`/appointments/create?${queryString}`);
    };
    
    if (isLoading) {
        return (
            <div className={`${styles.appointmentsUl} wrapp`}>
                <p>Loading available time slots...</p>
            </div>
        );
    }
    
    if (availableSlots.length === 0 && selectedTerm.date) {
        return (
            <div className={`${styles.appointmentsUl} wrapp`}>
                <p>No available time slots for the selected date.</p>
            </div>
        );
    }
    
    return (
        <ul className={`${styles.appointmentsUl} wrapp`}>
            {availableSlots.map((slot) => (
                <li key={slot}>
                    <button 
                        onClick={() => handleSlotClick(slot)}
                        className={styles.availableSlot}
                    >
                        {normalizeTimeString(slot)}
                    </button>
                </li>
            ))}
        </ul>
    );
};
export default AvailableAppointments;