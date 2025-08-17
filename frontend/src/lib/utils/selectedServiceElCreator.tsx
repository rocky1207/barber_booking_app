import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
import ArrowUp from "@/components/UI/SvgIcons/ArrowUp";
import ArrowDown from "@/components/UI/SvgIcons/ArrowDown";
import styles from '@/components/UI/Services/Services.module.css';

interface Props {
    choosenServices: SingleServiceType[], 
    setShowServices: React.Dispatch<React.SetStateAction<boolean>>,
    showServices: boolean,
    choosenBaber: BasicBarberType | undefined
}

export const selectedServiceElCreator = ({ choosenServices, setShowServices, showServices, choosenBaber}: Props) => {
    
    const handleShowServices = () => {
        setShowServices(prev => !prev);
    }
    let text: string;
    let serviceDivElement: React.ReactNode;
    let serviceUlElement: React.ReactNode;
    const arrow = {
            width: '15',
            height: '20',
            fill: '#eeba40'
        }
    if(choosenServices.length > 0) {
        if(choosenServices.length === 1) {
            text = `${choosenServices[0].userService}: ${choosenServices[0].price}`;
        } else {
            text = `${choosenServices.length} usluge`;
        }
        
        serviceDivElement = <div className={styles.flexLeft}>
            <p className={styles.flexLeftText}>{text}</p>
            <button onClick={handleShowServices} className={styles.arrowButton}>
                    {!showServices ? <ArrowUp {...arrow} /> : <ArrowDown {...arrow} />}
                </button>
            </div>;
        serviceUlElement = <ul className={`${styles.selectedServices} wrapp`}>
                {choosenServices.map((service) => {
                    const text = `${service.userService}: ${service.price}`;
                    return (
                        <li key={service.id}>
                            <p>{text}</p>
                            <p>Frizer - {choosenBaber?.username}</p>
                        </li>
                    )
                })}
            </ul>
    };
    return {serviceDivElement, serviceUlElement};
}