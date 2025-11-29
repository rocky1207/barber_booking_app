'use client';
import NavigateButton from '@/components/Button/NavigateButton';
import { ExtendedBarberType } from '@/types/Barbers/BarbersType';
import { bookBtn } from '@/datas/ButttonObjects';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { uiActions } from '@/store/slices/uiSlice';
import ArrowRight from '../SvgIcons/ArrowRight';
import styles from './Barbers.module.css';
import { useEffect, useState } from 'react';

const BarberItem:React.FC<ExtendedBarberType> = ({id, full_name, role, file, index, children}) => {
    const [deleteBarberErrorMsg, setDeleteBarberErrorMsg] = useState('');
    const {actionBarberId} = useAppSelector((state: RootState) => state?.barber);
    const {deleteItemErrorMessage} = useAppSelector((state: RootState) => state?.ui);
    
    const router = useRouter();
    const pathName = usePathname();
    const imageUrl = 'http://barber_booking_app.local/images/';
    const dispatch = useAppDispatch();
   
    useEffect(() => {
        if(deleteItemErrorMessage.delete_barber !== '') {
        setDeleteBarberErrorMsg(deleteItemErrorMessage.delete_barber);
        dispatch(uiActions.setDeleteItemErrorMessage({...deleteItemErrorMessage, delete_barber: ''}));
        }
    }, [deleteItemErrorMessage.delete_barber]);
    const handleClick = ():void => {
        dispatch(uiActions.setIsLoading(true));
        router.push(`/services?barberId=${id}`);
    }
    const svgData = {
        width: "16", 
        height: "16", 
        fill: "#B8941F"
    }
    /*
    const newBookBtn = {
        ...bookBtn,
        onAction: handleClick
    }
        */
    const showButton = pathName === '/' ? true : false;
    const defaultAvatar = "/images/avatar.png"; ;
    const src = file && file.trim() !== '' ? `${imageUrl}${file}` : defaultAvatar;
    
    return (
        <li key={id} className={`${styles.barberItem}`}
        style={{ animationDelay: `${index * 0.2}s` }} >
            <div className={`${showButton ? 'card' : 'cardDashboard'}`}>
            <div className={styles.customerVew}>
                <div className='profileImageDiv'>
                    <img src={src} alt="Barber image" />
                </div>
                {/*<div className={styles.barberInfoDiv}>
                    <p>{username}</p>
                    {showButton && <div><NavigateButton {...newBookBtn} /></div>}
                </div>*/}
                <div className={styles.barberInfoDiv}>
                    <button className={`${!showButton && styles.removePointer}`} onClick={handleClick }>
                        <p>{full_name}</p>
                        {showButton && <ArrowRight {...svgData} />}
                    </button>
                </div>
            </div>
            {children}
            {!showButton && actionBarberId === id &&<p>{deleteBarberErrorMsg}</p>}
            </div>
        </li>
    );
};
export default BarberItem;

