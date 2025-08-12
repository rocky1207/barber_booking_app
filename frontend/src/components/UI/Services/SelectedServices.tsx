'use client';
import { useAppSelector, useAppDispatch } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';
import styles from './Services.module.css';
const SelectedServices: React.FC = () => {
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
        const params = useSearchParams();
        const strBarberId = params.get('barberId');
        const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
        const router = useRouter();
        const dispatch = useAppDispatch();
    console.log(choosenServices);
    const serviceParams = choosenServices.map((service, i) => {
        return `serviceId${i+1}=${service}`
    }).join('&');
    console.log(serviceParams);

    const handleClick = () => {
        router.push(`/booking?barberId=${barberId}&${serviceParams}`);
        setIsLoadingState(true, dispatch);
    };
    let text: string;
    let element;
    if(choosenServices.length === 0) {
        text = 'Izaberite uslugu';
        element = <p>{text}</p>
            
    }else if(choosenServices.length === 1) {
        text = `${choosenServices[0].userService}: ${choosenServices[0].price}`;
        element = <ul>
                <li>{text}</li>
            </ul>
        
    } else {
        text = `${choosenServices.length} usluge`;
        element = <div className='flexed'><p>{text}</p><button className={styles.arrowButton}>
            <svg
                width="20"
                height="20"
                fill="#eeba40"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 199.404 199.404"
                >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                    <polygon points="0,135.411 28.285,163.695 99.703,92.277 171.119,163.695 199.404,135.412 99.703,35.709" />
                </g>
            </svg>
            </button></div>;
    }
    return (
        <section className={`${styles.selectedServiceSection}`}>
            <div className='wrapp flexed'>
            {element}
            <button className={styles.continueButton} onClick={handleClick} >NASTAVI</button>
            </div>
        </section>
    )
};
export default SelectedServices;