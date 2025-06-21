'use client';

//import { useRouter } from 'next/navigation';
import NavigateButton from '@/components/Button/NavigateButton';
//import { itemBtns } from '@/datas/ButttonObjects';
import { BarberType } from '@/types/Barbers/BarbersType';
import { bookBtn } from '@/datas/ButttonObjects';
import { useRouter } from "next/navigation";
import styles from './Barbers.module.css';



const BarberItem:React.FC<BarberType> = ({id, username, file, role, password, index, children}) => {
   const router = useRouter();
    const imageUrl = 'http://barber_booking_app.local/images/';
    const handleClick = ():void => {
            router.push('/services');
        }
    const newBookBtn = {
        ...bookBtn,
        onAction: handleClick
    }
    
            
    return (
        <li key={id} className={styles.barberItem}
        style={{ animationDelay: `${index * 0.2}s` }} /*dinamičko kašnjenje*/>
            <div className={styles.customerVew}>
                <div className='profileImageDiv'>
                    <img src={file?.trim() ? `${imageUrl}${file}` : '/images/avatar.png'} alt="Barber image" />
                </div>
                <div className={styles.barberInfoDiv}>
                    <p>{username}</p>
                    <div><NavigateButton {...newBookBtn} /></div>
                </div>
            </div>
            {children}
        </li>
    );
};
export default BarberItem;