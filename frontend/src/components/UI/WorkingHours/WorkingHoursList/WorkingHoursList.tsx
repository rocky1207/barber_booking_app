'use client';
import { useState, useEffect, useRef } from 'react';
//import { workingHoursApi } from '@/lib/api/working_hours/workingHoursApi';
//import { WorkingHoursType } from '@/types/WorkingHours/WorkingHoursType';
import UpdateWorkingHoursForm from '@/components/Forms/WorkingHours/UpdateWorkingHoursForm/UpdateWorkingHoursForm';
import { getWorkingHoursByUserId } from '@/lib/api/working_hours/getWorkingHoursByUserId';
import { useAppSelector, useAppDispatch } from '@/store/hooks/typizedHooks';
import { workingHoursActions } from '@/store/slices/workingHoursSlice';
import { workingHoursActiondispatcher } from '@/lib/utils/workingHoursActionDispatcher';
import { RootState } from '@/store/store';
import styles from './WorkingHoursList.module.css';

import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import { modalActionBtn } from '@/datas/ButttonObjects';
//import { deleteBarberBtn } from '@/datas/ButttonObjects';
import { deleteBtn } from '@/datas/ButttonObjects';
import NavigateButton from '@/components/Button/NavigateButton';
//import { deleteWorkingHours } from '@/lib/api/working_hours/deleteWorkingHours';
import { deleteById } from '@/lib/api/deleteById';
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';

interface WorkingHoursListProps {
    loggedBarberId: number;
    onWorkingHoursChange?: () => void;
}

const WorkingHoursList: React.FC<WorkingHoursListProps> = ({ loggedBarberId, onWorkingHoursChange }) => {
   // const [workingHours, setWorkingHours] = useState<WorkingHoursType[]>([]);
    //const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const {userWorkingHours, actionWorkingHoursId} = useAppSelector((state: RootState) => state.workingHours);
    const dialog = useRef<HTMLDialogElement | null>(null);
    console.log(userWorkingHours);
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        fetchWorkingHours();
        setIsLoadingState(true, dispatch);
    }, [loggedBarberId]);

    const fetchWorkingHours = async () => {
        try {
            //setLoading(true);
            //const response = await workingHoursApi.getWorkingHoursByUserId(userId);
            const response = await getWorkingHoursByUserId(loggedBarberId);
            console.log(response);
            if (response.success && response.data) {
               // setWorkingHours(Array.isArray(response.data) ? response.data : []);
                workingHoursActiondispatcher(response.data ?? [], 'GET_USER_WORKING_HOURS', dispatch);
                
            } else {
                setMessage(response.message || 'Greška pri učitavanju radnih sati.');
            }
        } catch (error) {
            setMessage('Greška pri učitavanju radnih sati.');
        } finally {
            //setLoading(false);
            setIsLoadingState(false, dispatch);
        }
    };
    /*
    const handleDelete = async (id: number) => {
       
        
        if (!confirm('Da li ste sigurni da želite da obrišete ove radne sate?')) {
            return;
        }

        try {
            const response = await workingHoursApi.deleteWorkingHours(id);
            
            if (response.success) {
                setMessage('Radni sati su uspešno obrisani.');
                fetchWorkingHours();
                if (onWorkingHoursChange) {
                    onWorkingHoursChange();
                }
            } else {
                setMessage(response.message || 'Greška pri brisanju radnih sati.');
            }
        } catch (error) {
            setMessage('Greška pri brisanju radnih sati.');
        }
    };
*/
    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleUpdateSuccess = () => {
        setEditingId(null);
        fetchWorkingHours();
        if (onWorkingHoursChange) {
            onWorkingHoursChange();
        }
    };

    const handleCancelEdit = () => {
       setEditingId(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sr-RS');
    };

    const formatTime = (timeString: string) => {
        return timeString.substring(0, 5); // Remove seconds if present
    };
/*
    if (loading) {
        return <div className={styles.loading}>Učitavanje radnih sati...</div>;
    }
*/

    
    const handleDelete = (id: number) => {
        dispatch(workingHoursActions.setActionWorkingHoursId(id));
        if(dialog && typeof dialog !== "function" && dialog.current) dialog.current.showModal();
    }

    
    const updatedDeleteBarberBtn = {
        //...deleteBarberBtn,
        ...deleteBtn,
        id: actionWorkingHoursId,
       // head: 'DA LI STE SIGURNI??',
        action: 'DELETE_WORKING_HOURS_BY_ID',
        //onAction: deleteWorkingHours
        onAction: deleteById
    }



    return (
        <>
        <ConfirmModal ref={dialog} {...updatedDeleteBarberBtn}/>
        <div className={styles.container}>
            <h3>Moji radni sati</h3>
            {message && <p className={styles.message}>{message}</p>}
            
            {userWorkingHours.length === 0 ? (
                <p className={styles.empty}>Nema unetih radnih sati.</p>
            ) : (
                <div className={styles.list}>
                    {userWorkingHours.map((wh) => {
                       const deleteModalActionBtn = {
                        ...modalActionBtn,
                        onAction: () => handleDelete(wh.id)
                    }
                    const editModalActionBtn = {
                        ...modalActionBtn,
                        text: 'IZMENI',
                        onAction: () => handleEdit(wh.id)
                    }
                       return (
                        <div key={wh.id} className={styles.item}>
                            {editingId === wh.id ? (
                                <UpdateWorkingHoursForm
                                    workingHours={wh}
                                    onSuccess={handleUpdateSuccess}
                                    onCancel={handleCancelEdit}
                                />
                            ) : (
                                
                                <div className={styles.content}>
                                    <div className={styles.dates}>
                                        <span className={styles.dateRange}>
                                            {formatDate(wh.start_date)} - {formatDate(wh.end_date)}
                                        </span>
                                    </div>
                                    <div className={styles.times}>
                                        <span className={styles.timeRange}>
                                            {formatTime(wh.start_time)} - {formatTime(wh.end_time)}
                                        </span>
                                    </div>
                                    <div className={styles.actions}>
                                        <NavigateButton {...editModalActionBtn}/>
                                        {/*
                                        <button 
                                            onClick={() => handleEdit(wh.id)}
                                            className={styles.editBtn}
                                        >
                                            Izmeni
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleDelete(wh.id)}
                                            className={styles.deleteBtn}
                                        >
                                            Obriši
                                        </button>*/}
                                       <NavigateButton {...deleteModalActionBtn}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )})}
                </div>
            )}
        </div>
        </>
    );
};

export default WorkingHoursList;



