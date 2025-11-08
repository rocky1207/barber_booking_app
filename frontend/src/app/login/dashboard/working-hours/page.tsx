'use client';
//import { useEffect } from 'react';
//import { useRouter } from 'next/navigation';
import WorkingHoursManager from '@/components/UI/WorkingHours/WorkingHoursManager/WorkingHoursManager';

const WorkingHoursPage = () => {
   // const router = useRouter();
    
    
/*
    useEffect(() => {
        if (!barber || barber.role !== 'user') {
            router.push('/login');
        }
    }, [barber, router]);

    if (!barber || barber.role !== 'user') {
        return <div>Pristup odbijen. Molimo prijavite se.</div>;
    }
*/
    return (
        <div>
            <WorkingHoursManager />
        </div>
    );
};

export default WorkingHoursPage;



