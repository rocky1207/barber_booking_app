'use client';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { appointmentActions } from '@/store/slices/appointmentSlice';
import { useAppDispatch } from '@/store/hooks/typizedHooks';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';
import { getItemsByUserId } from '@/lib/api/getItemsByUserId';
import { GetReservedAppointmentsReturnDataType } from '@/types/Api/ReturnAppointmentType';
import { calculateAvailableTimeSlotsWithWorkingHours } from '@/lib/utils/calculateAvailableAppointments';
import { normalizeTimeString, filterAvailableTimeSlots } from '@/lib/utils/timeUtils';
import styles from './Appointments.module.css';

const AvailableAppointments: React.FC = () => {
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const queryString = useSearchParams().toString();

    console.log(selectedTerm);
    console.log(availableSlots);
    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (!selectedTerm.date || choosenServices.length === 0) {
                setAvailableSlots([]);
                return;
            }
            setIsLoadingState(true, dispatch);
            try {
                const data = await getItemsByUserId({
                    userId: choosenServices[0].userId, 
                    date: selectedTerm.date
                }, 'GET_RESERVED_APPOINTMENTS');
                const reservedAppointments = data as GetReservedAppointmentsReturnDataType;
                if (reservedAppointments.success && reservedAppointments.data) {
                    console.log(reservedAppointments);
                    const slots = await calculateAvailableTimeSlotsWithWorkingHours(
                        reservedAppointments.data, 
                        {
                            serviceCount: choosenServices.length,
                            slotDuration: 30,
                            bufferTime: 0
                        },
                        choosenServices[0].userId,
                        selectedTerm.date
                    );
                    const filteredSlots = filterAvailableTimeSlots(slots, selectedTerm.date, 60);
                    setAvailableSlots(filteredSlots);
                    setIsLoadingState(false, dispatch);
                } else {
                    console.error('Failed to fetch reserved appointments:', reservedAppointments.message);
                    setAvailableSlots([]);
                    setIsLoadingState(false, dispatch);
                }
            } catch (error) {
                console.error('Error fetching available slots:', error);
                setAvailableSlots([]);
                setIsLoadingState(false, dispatch);
            } 
            
        };
        fetchAvailableSlots();
    }, [selectedTerm.date, choosenServices]);
    const handleSlotClick = (timeSlot: string) => {
        dispatch(appointmentActions.setSelectedTerm({
            ...selectedTerm, 
            time: normalizeTimeString(timeSlot)
        }));
        router.push(`/appointments/create?${queryString}`);
    };
    
    if (isLoading) {
       
    }
    
    if (availableSlots.length === 0 && selectedTerm.date) {
        return (
            <div className={`${styles.appointmentsUl}`}>
                <p>Nema dostupnih termina za izabrani datum.</p>
            </div>
        );
    }
    
    return (
        <ul className={`${styles.appointmentsUl}`}>
            {availableSlots?.map((slot) => (
                <li key={slot}>
                    <button 
                        onClick={() => handleSlotClick(slot)}
                        className=''
                    >
                        {normalizeTimeString(slot)}
                    </button>
                </li>
            ))}
        </ul>
    );
};
export default AvailableAppointments;