'use client';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';
import { selectedServiceElCreator } from '@/lib/utils/selectedServiceElCreator';
import { continueBtn } from '@/datas/ButttonObjects';
import NavigateButton from '@/components/Button/NavigateButton';
import styles from './Services.module.css';

const SelectedServices: React.FC = () => {
    const [showServices, setShowServices] = useState<boolean>(false);
    const {barbers} = useAppSelector((state: RootState) => state?.barber);
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const params = useSearchParams();
    const strBarberId = params.get('barberId');
    const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
    const pathName = usePathname().replace('/', '');
    console.log(selectedTerm);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const serviceParams = choosenServices.map((service, i) => {
        return `serviceId${i+1}=${service.id}`
    }).join('&');
    const choosenBaber = barbers?.find(barber => barber.id === barberId);
    
    const handleClick = () => {
       if(choosenServices.length === 0) return;
        router.push(`/appointments?barberId=${barberId}&${serviceParams}`);
        setIsLoadingState(true, dispatch);
    };
    const data = {
        choosenServices, setShowServices, showServices, choosenBaber
    }
    const {serviceDivElement, serviceUlElement} = selectedServiceElCreator(data);
    const updateContinueBtn = {
        ...continueBtn,
        className: `${styles.continueButton} ${choosenServices.length === 0 && styles.continueButtonEmpty}`,
        onAction: handleClick
    }
    
    return (
        <>
        {choosenServices.length > 0 && <section className={`${styles.selectedServiceSection}`}>
            <div className='wrapp flexed'>
                {serviceDivElement}
                {!pathName.includes('appointments') && <NavigateButton {...updateContinueBtn}/>}
            </div>
            <div>
                <p>hello</p>
            </div>
            {showServices && serviceUlElement}
        </section>}
        </>
    )
};
export default SelectedServices;