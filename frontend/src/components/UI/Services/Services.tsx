"use client";
import { useEffect } from 'react';
import ServiceItem from './ServiceItem';
import { SingleServiceType } from '@/types/Api/ReturnServiceType';
import { useAppDispatch, useAppSelector } from '@/store/hooks/typizedHooks';
import { serviceActions } from '@/store/slices/serviceSlice';
import { useSearchParams } from 'next/navigation';
import { RootState } from '@/store/store';
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';

interface Props {
  services: SingleServiceType[];
};
const Services:React.FC<Props> = ({services}) => {
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    const params = useSearchParams();
    const strBarberId = params.get('barberId');
    const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        setIsLoadingState(false, dispatch);
        dispatch(serviceActions.setServiceSlice(services));
    }, [services]);
    const userServices = services.filter((service) => {
        return service.userId === barberId}
    );
    return (
        <section>
            <h1>ODABERITE USLUGU</h1>
            {userServices.length > 0 ? <nav aria-label="Choose service navigation">
                <ul>
                    {userServices.map((service: SingleServiceType, index: number) => {
                        return <ServiceItem key={service.id} service={service} index={index} showBtns={false} />
                    })}
                </ul>
            </nav>:
            <p className='textCenter'>Trenutno nema unetih usluga za izabranog frizera</p>}
        </section>
    );
};
export default Services;