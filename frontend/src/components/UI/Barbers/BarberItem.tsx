'use client';
import NavigateButton from '@/components/Button/NavigateButton';
import { ExtendedBarberType } from '@/types/Barbers/BarbersType';
import { bookBtn } from '@/datas/ButttonObjects';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks/typizedHooks';
import { uiActions } from '@/store/slices/UiSlice';
import styles from './Barbers.module.css';


const BarberItem:React.FC<ExtendedBarberType> = ({id, username, role, file, index, children}) => {
    const router = useRouter();
    const pathName = usePathname();
    const imageUrl = 'http://barber_booking_app.local/images/';
    const dispatch = useAppDispatch();
    const handleClick = ():void => {
            dispatch(uiActions.setIsLoading(true));
            router.push(`/services?barberId=${id}`);
        }
    const newBookBtn = {
        ...bookBtn,
        onAction: handleClick
    }
    const showButton = pathName === '/' ? true : false;
    //const showItem = role !== 'owner' ? false : true;
    const defaultAvatar = "/images/avatar.png"; ;
    const src = file && file.trim() !== '' ? `${imageUrl}${file}` : defaultAvatar;
    
    return (
        <li key={id} className={styles.barberItem}
        style={{ animationDelay: `${index * 0.2}s` }} /*dinamičko kašnjenje*/>
            <div className={styles.customerVew}>
                <div className='profileImageDiv'>
                    <img src={src} alt="Barber image" />
                </div>
                <div className={styles.barberInfoDiv}>
                    <p>{username}</p>
                    {showButton && <div><NavigateButton {...newBookBtn} /></div>}
                </div>
            </div>
            {children}
        </li>
    );
};
export default BarberItem;