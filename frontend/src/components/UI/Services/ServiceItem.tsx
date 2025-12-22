import { useState, useEffect } from 'react';
import { SingleServiceType } from '@/types/Api/ReturnServiceType';
import ServiceButtons from './ServiceButtons';
import { useAppSelector, useAppDispatch } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import { serviceActions } from '@/store/slices/serviceSlice';
import { uiActions } from '@/store/slices/uiSlice';
import { forwardRef } from 'react';
import Logo from '../Logo/Logo';
import styles from './Services.module.css';

interface Props {
    service: SingleServiceType;
    index: number;
    showBtns: boolean;
}
const ServiceItem = forwardRef<HTMLDialogElement,Props>(({index, service, showBtns},  ref) => {
    //const {role} = useAppSelector((state: RootState) => state?.barber?.loggedBarber);
    const [deleteServiceErrorMsg, setDeleteServiceErrorMsg] = useState('');
    const {choosenServices, serviceActionId} = useAppSelector((state: RootState) => state?.service);
    const {deleteItemErrorMessage } = useAppSelector((state: RootState) => state?.ui);
    const dispatch = useAppDispatch();
    const servicePrice = service.price;
    useEffect(() => {
        if(deleteItemErrorMessage.delete_service !== '') {
        setDeleteServiceErrorMsg(deleteItemErrorMessage.delete_service);
        dispatch(uiActions.setDeleteItemErrorMessage({...deleteItemErrorMessage, delete_service: ''}));
        }
    }, [deleteItemErrorMessage.delete_service]);
    //let showBtn: boolean;
   // showBtn = role === 'owner' || role === 'admin' || role === 'user' ? true : false;
    let isActive;
    const svgData = {
    width: '16px',
    height: '16px',
    fill: "#B8941F"
  }
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
    const logoClasses = {logoDiv: 'logoDiv-2', logoImage: 'logo-2'};
    return (
        <li key={service.id} className={`${styles.serviceItem} ${isActive ? styles.serviceItemActive : ''}`} style={{ animationDelay: `${index * 0.2}s` }}>
            <div className= {`${!showBtns ? 'card' : 'cardDashboard'} ${!showBtns && isActive ? 'activeService' : ''}`}>
            <button className={`${styles.bookNavBtn} ${showBtns && 'cursorDefault'}`} onClick={handleClick}>
                <div className='flexed'>
                    <Logo {...logoClasses} />
                </div>
                {service.userService} - {servicePrice}din
                </button>
            {showBtns && <ServiceButtons serviceId={service.id} ref={ref} />}
            {showBtns && serviceActionId === service.id &&  <p>{deleteServiceErrorMsg}</p>}
            </div>
        </li>
    );
});
export default ServiceItem;