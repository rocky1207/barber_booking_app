'use client';
import { useState, useEffect, useRef } from 'react';
import UpdateWorkingHoursForm from '@/components/Forms/WorkingHours/UpdateWorkingHoursForm/UpdateWorkingHoursForm';
import { getItemsByUserId } from '@/lib/api/getItemsByUserId';
import { useAppSelector, useAppDispatch } from '@/store/hooks/typizedHooks';
import { workingHoursActions } from '@/store/slices/workingHoursSlice';
import { workingHoursActiondispatcher } from '@/lib/utils/workingHoursActionDispatcher';
import { WorkingHoursApiReturnType } from '@/types/WorkingHours/WorkingHoursType';
import { RootState } from '@/store/store';
import ConfirmModal from '../../Modals/ConfirmModal/ConfirmModal';
import { modalActionBtn } from '@/datas/ButttonObjects';
import { deleteBtn } from '@/datas/ButttonObjects';
import NavigateButton from '@/components/Button/NavigateButton';
import { deleteItemsById } from '@/lib/api/deleteItemsById';
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';
import styles from './WorkingHoursList.module.css';

interface WorkingHoursListProps {
    loggedBarberId: number;
}

const WorkingHoursList: React.FC<WorkingHoursListProps> = ({ loggedBarberId}) => {
    const [message, setMessage] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const {userWorkingHours, actionWorkingHoursId} = useAppSelector((state: RootState) => state.workingHours);
    const dialog = useRef<HTMLDialogElement | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        fetchWorkingHours();
        setIsLoadingState(true, dispatch);
    }, [loggedBarberId]);

    const fetchWorkingHours = async () => {
        const responseData = await getItemsByUserId({userId: loggedBarberId, date: ''}, 'GET_WORKING_HOURS_BY_USER_ID');
        const {success, data, message, actionDone} = responseData as WorkingHoursApiReturnType;
        if(!success) {
            setMessage(message || 'Greška pri učitavanju radnih sati.');
            setIsLoadingState(false, dispatch);
            return;
        };
        actionDone && workingHoursActiondispatcher(data ?? [], actionDone, dispatch);
        setIsLoadingState(false, dispatch);
    };
    const handleEdit = (id: number) => {
    setEditingId(id);
    };

    const handleUpdateSuccess = () => {
        setEditingId(null);
        fetchWorkingHours();
    };

    const handleCancelEdit = () => {
       setEditingId(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sr-RS');
    };

    const formatTime = (timeString: string) => {
        return timeString.substring(0, 5);
    };
    const handleDelete = (id: number) => {
        dispatch(workingHoursActions.setActionWorkingHoursId(id));
        if(dialog && typeof dialog !== "function" && dialog.current) dialog.current.showModal();
    }
    const updatedDeleteBarberBtn = {
        ...deleteBtn,
        id: actionWorkingHoursId,
       action: 'DELETE_WORKING_HOURS_BY_ID',
       onAction: deleteItemsById
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



