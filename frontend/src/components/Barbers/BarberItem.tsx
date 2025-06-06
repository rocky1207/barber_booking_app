'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { itemBtns } from '@/datas/ButttonObjects';
import { bookBtn } from '@/datas/ButttonObjects';
import styles from './Barbers.module.css';




interface BarberItemPropsType {
  id: string;
  name: string;
  index: number;
  children?: ReactNode;
}


const BarberItem:React.FC<BarberItemPropsType> = ({id, name, index, children}) => {
    const router = useRouter();
    const handleClick = ():void => {
            router.push('/services');
        }
    
            return (
                <li key={id} className={styles.barberItem} onClick={handleClick}
                style={{ animationDelay: `${index * 0.2}s` }} /*dinamičko kašnjenje*/>
                    <div className={styles.customerVew}>
                        <div className='profileImageDiv'>
                            <img src="http://barber_booking_app.local/images/ja.jpg" alt="Barber image" />
                        </div>
                        <div className={styles.barberInfoDiv}>
            <p>{name}</p>
            <div><Button {...bookBtn} /></div>
        </div>
                        
                    </div>
                    {children}
            </li>
            )
        
            
            
       
    
};
export default BarberItem;