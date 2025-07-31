import { SingleServiceType } from '@/types/Api/ReturnServiceType';
import ServiceButtons from './ServiceButtons';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { forwardRef } from 'react';
import styles from './Services.module.css';
interface Props {
    service: SingleServiceType;
    index: number;
    showBtns: boolean;
   // setDeleteServiceId: React.Dispatch<React.SetStateAction<number>>
}
const ServiceItem = forwardRef<HTMLDialogElement,Props>(({index, service, showBtns},  ref) => {
    const {role} = useAppSelector((state: RootState) => state.barber.loggedBarber);
    const router = useRouter();
    const servicePrice = service.price;
    let showBtn: boolean;
   // console.log(role);
    showBtn = role === 'owner' || role === 'admin' || role === 'user' ? true : false;
    //console.log(showBtn);
    const handleClick = () => {router.push(`/booking?userId=${service.userId}&service=${service.userService}`)};

    return (
        <li key={service.id} className={styles.serviceItem} style={{ animationDelay: `${index * 0.2}s` }}>
            <button className={styles.bookNavBtn} onClick={handleClick}>{service.userService}: <span>{servicePrice}din.</span></button>
            {showBtns && <ServiceButtons serviceId={service.id} ref={ref} />}
        </li>
    );
});
export default ServiceItem;