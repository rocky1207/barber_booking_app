import { SingleServiceType } from '@/types/Api/ReturnServiceType';
import ServiceButtons from './ServiceButtons';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { serviceActions } from '@/store/slices/serviceSlice';
import { forwardRef } from 'react';
import styles from './Services.module.css';

interface Props {
    service: SingleServiceType;
    index: number;
    showBtns: boolean;
}
const ServiceItem = forwardRef<HTMLDialogElement,Props>(({index, service, showBtns},  ref) => {
    const {role} = useAppSelector((state: RootState) => state?.barber?.loggedBarber);
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const servicePrice = service.price;
    let showBtn: boolean;
   
    showBtn = role === 'owner' || role === 'admin' || role === 'user' ? true : false;
    
    
    let isActive;
    const handleClick = () => {
        const exists = choosenServices.some(s => s.id === service.id);
        let updated: SingleServiceType[];
        if(exists) {
            updated = choosenServices.filter(s => s.id !== service.id);
        } else {
            updated = [...choosenServices, service];
        }
        dispatch(serviceActions.setChoosenServices(updated));
    };
    isActive = choosenServices.some(s => s.id === service.id);
    return (
        <li key={service.id} className={`${styles.serviceItem} ${isActive ? styles.serviceItemActive : ''}`} style={{ animationDelay: `${index * 0.2}s` }}>
            <button className={styles.bookNavBtn} onClick={handleClick}>{service.userService}: {servicePrice}din.</button>
            {showBtns && <ServiceButtons serviceId={service.id} ref={ref} />}
        </li>
    );
});
export default ServiceItem;