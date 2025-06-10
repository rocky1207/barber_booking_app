'use client';

import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { itemBtns } from '@/datas/ButttonObjects';
import { BarberItemPropsType } from '@/types/Barbers/BarberItemPropsType';
import { bookBtn } from '@/datas/ButttonObjects';
import styles from './Barbers.module.css';



const BarberItem:React.FC<BarberItemPropsType> = ({id, username, file, role, password, index, children}) => {
    const router = useRouter();
    const imageUrl = 'http://barber_booking_app.local/images/';
    const handleClick = ():void => {
            router.push('/services');
        }
    return (
        <li key={id} className={styles.barberItem} onClick={handleClick}
        style={{ animationDelay: `${index * 0.2}s` }} /*dinamičko kašnjenje*/>
            <div className={styles.customerVew}>
                <div className='profileImageDiv'>
                    <img src={file?.trim() ? `${imageUrl}${file}` : '/images/avatar.png'} alt="Barber image" />
                </div>
                <div className={styles.barberInfoDiv}>
                    <p>{username}</p>
                    <div><Button {...bookBtn} /></div>
                </div>
            </div>
            {children}
        </li>
    );
};
export default BarberItem;