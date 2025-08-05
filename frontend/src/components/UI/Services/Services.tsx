"use client";
import { useState, useEffect } from 'react';
import ServiceItem from './ServiceItem';
import { SingleServiceType } from '@/types/Api/ReturnServiceType';
import { useAppDispatch, useAppSelector } from '@/store/hooks/typizedHooks';
import { serviceActions } from '@/store/slices/serviceSlice';
import { useSearchParams } from 'next/navigation';
import { barberActions } from '@/store/slices/barberSlice';
import { uiActions } from '@/store/slices/UiSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';

interface Props {
  services: SingleServiceType[];
};
const Services:React.FC<Props> = ({services}) => {
    // const [dleteServiceId, setDeleteServiceId] = useState<number>(0);
    const {choosenServices} = useAppSelector((state: RootState) => state?.service);
    const params = useSearchParams();
    const strBarberId = params.get('barberId');
    const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
    const router = useRouter();
   /* const updateServices = services.map((service: SingleServiceType) => {
        return {
            ...service,
            price: formatPrice(service.price)
        }
    })
        */
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(uiActions.setIsLoading(false));
        dispatch(serviceActions.setServiceSlice(services));
    }, [services]);
    const userServices = services.filter((service) => {
        return service.userId === barberId});
    console.log(barberId);
    console.log(userServices);
    const serviceParams = choosenServices.map((service, i) => {
        return `serviceId${i+1}=${service}`
    }).join('&');
    console.log(serviceParams);

    const handleClick = () => {router.push(`/booking?barberId=${barberId}&${serviceParams}`)};
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
             <button onClick={handleClick}>NASTAVI</button>
        </section>
    );
};
export default Services;