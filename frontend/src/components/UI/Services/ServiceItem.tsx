import { SingleServiceType } from '@/types/Api/ReturnServiceType';
import { formatPrice } from '@/lib/utils/formatPrice';
import NavigateButton from '@/components/Button/NavigateButton';
import { useRouter } from 'next/navigation';
import { modalActionBtn } from '@/datas/ButttonObjects';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import styles from './Services.module.css';
interface Props {
    service: SingleServiceType;
    index: number;
}
const ServiceItem:React.FC<Props> = ({service, index}) => {
    const {role} = useAppSelector((state: RootState) => state.barber.loggedBarber);
    const router = useRouter();
    const servicePrice = formatPrice(service.price);

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
            {showBtn && <NavigateButton {...newModalActionBtn}/>}
        </li>
    );
};
export default ServiceItem;