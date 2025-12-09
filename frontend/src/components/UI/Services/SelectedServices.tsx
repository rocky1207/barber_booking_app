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
import Pencil from '../SvgIcons/Pencil';
import styles from './Services.module.css';

const SelectedServices: React.FC = () => {
    const [showServices, setShowServices] = useState<boolean>(false);
    const {barbers} = useAppSelector((state: RootState) => state?.barber);
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    const {selectedTerm} = useAppSelector((state: RootState) => state.appointment);
    const params = useSearchParams();
    const strBarberId = params.get('barberId');
    const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
    const pathName = usePathname().replace('/', '');
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
    const svgData = {
            width: '20',
            height: '25',
            fill: '#B8941F'
        }
    const clickHandle = () => {
        router.push(`/appointments?barberId=${barberId}&${serviceParams}`);
    }
    return (
        <>
        {choosenServices.length > 0 && <section className={`glass-gold ${styles.selectedServiceSection}`}>
            <div className={`wrapp flexed ${styles.showServicesDiv}`}>
                {serviceDivElement}
                {!pathName.includes('appointments') && <NavigateButton {...updateContinueBtn}/>}
            </div>
            {showServices && selectedTerm.time && selectedTerm.date && <div className={`wrapp flexed  ${styles.selectedTerm}`}>
                <div>
                    <p>{selectedTerm.time}</p>
                    <p>{selectedTerm.date}</p>
                </div>
                <div>
                    <button onClick={clickHandle}><Pencil {...svgData} /></button>
                </div>
            </div>}
            {showServices && serviceUlElement}
        </section>}
        </>
    )
};
export default SelectedServices;
