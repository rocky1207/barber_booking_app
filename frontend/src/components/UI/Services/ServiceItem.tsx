import { SingleServiceType } from '@/types/Api/ReturnServiceType';
import { formatPrice } from '@/lib/utils/formatPrice';
import { useRouter } from 'next/navigation';
interface Props {
    service: SingleServiceType;
    index: number;
}
const ServiceItem:React.FC<Props> = ({service, index}) => {
    const router = useRouter();
    const servicePrice = formatPrice(service.price);
    const handleClick = () => {router.push(`/booking?userId=${service.userId}&serviceId=${service.id}`)};
    return (
        <li key={service.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <button onClick={handleClick}>{service.userService}: <span>{servicePrice}din.</span></button>
        </li>
    );
};
export default ServiceItem;