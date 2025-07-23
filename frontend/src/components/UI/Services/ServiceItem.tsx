import { SingleServiceType } from '@/types/Api/ReturnServiceType';
import ServiceButtons from './ServiceButtons';
import { useRouter } from 'next/navigation';
import { modalActionBtn } from '@/datas/ButttonObjects';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import styles from './Services.module.css';
interface Props {
    service: SingleServiceType;
    index: number;
    showBtns: boolean;
}
const ServiceItem:React.FC<Props> = ({index, service, showBtns}) => {
    const {role} = useAppSelector((state: RootState) => state.barber.loggedBarber);
    const router = useRouter();
    
    const servicePrice = service.price;

    const openModal = () => {
        console.log('radi');
       // router.push()
    }
    const newModalActionBtn = {
        ...modalActionBtn,
        onAction: openModal
    }
    let showBtn: boolean;
   // console.log(role);
    showBtn = role === 'owner' || role === 'admin' || role === 'user' ? true : false;
    //console.log(showBtn);
    const handleClick = () => {router.push(`/booking?userId=${service.userId}&service=${service.userService}`)};
    return (
        <li key={service.id} className={styles.serviceItem} style={{ animationDelay: `${index * 0.2}s` }}>
            <button className={styles.bookNavBtn} onClick={handleClick}>{service.userService}: <span>{servicePrice}din.</span></button>
            {showBtns && <ServiceButtons />}
        </li>
    );
};
export default ServiceItem;