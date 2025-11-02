'use client';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import InsertWorkingHoursForm from '@/components/Forms/WorkingHours/InsertWorkingHoursForm/InsertWorkingHoursForm';
import WorkingHoursList from '@/components/UI/WorkingHours/WorkingHoursList/WorkingHoursList';
import styles from './WorkingHoursManager.module.css';

const WorkingHoursManager: React.FC = () => {
    const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
    //const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const { loggedBarber } = useAppSelector((state: RootState) => state?.barber);
    const loggedBarberId: number = loggedBarber.id;

    const handleInsertSuccess = () => {
        setShowInsertForm(false);
       //setRefreshTrigger(prev => prev + 1);
    };

    const handleWorkingHoursChange = () => {
       // setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Upravljanje radnim satima</h2>
                <button 
                    onClick={() => setShowInsertForm(!showInsertForm)}
                    className={styles.toggleBtn}
                >
                    {showInsertForm ? 'Sakrij formu' : 'Dodaj radno vreme'}
                </button>
            </div>

            {showInsertForm && (
                <div className={styles.formContainer}>
                    <InsertWorkingHoursForm 
                        loggedBarberId={loggedBarberId} 
                        onSuccess={handleInsertSuccess}
                    />
                </div>
            )}

            <div className={styles.listContainer}>
                <WorkingHoursList 
                    key={loggedBarberId/*refreshTrigger*/}
                    loggedBarberId={loggedBarberId} 
                    onWorkingHoursChange={handleWorkingHoursChange}
                />
            </div>
        </div>
    );
};

export default WorkingHoursManager;


