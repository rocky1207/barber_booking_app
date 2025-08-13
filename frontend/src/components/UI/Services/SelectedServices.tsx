'use client';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';
import { selectedServiceElCreator } from '@/lib/utils/selectedServiceElCreator';
import styles from './Services.module.css';

const SelectedServices: React.FC = () => {
    const [showServices, setShowServices] = useState<boolean>(false);
    const {barbers} = useAppSelector((state: RootState) => state?.barber);
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
        const params = useSearchParams();
        const strBarberId = params.get('barberId');
        const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
        const router = useRouter();
        const dispatch = useAppDispatch();
    const serviceParams = choosenServices.map((service, i) => {
        return `serviceId${i+1}=${service}`
    }).join('&');
    const choosenBaber = barbers?.find(barber => barber.id === barberId);
    console.log(choosenBaber);
    const handleClick = () => {
       if(choosenServices.length === 0) return;
        router.push(`/booking?barberId=${barberId}&${serviceParams}`);
        setIsLoadingState(true, dispatch);
    };
    const data = {
        choosenServices, setShowServices, showServices, choosenBaber
    }
    const {element, elementTwo} = selectedServiceElCreator(data);

    
    return (
        <section className={`${styles.selectedServiceSection}`}>
            <div className={`${showServices && styles.showServicesDiv} wrapp flexed`}>
            {element}
            <button className={`${styles.continueButton} ${choosenServices.length === 0 && styles.continueButtonEmpty}`} onClick={handleClick} >NASTAVI</button>
            </div>
             {showServices && elementTwo}
        </section>
    )
};
export default SelectedServices;