"use client";
import { useEffect } from 'react';
import ServiceItem from './ServiceItem';
import { SingleServiceType } from '@/types/Api/ReturnServiceType';
import { useAppDispatch } from '@/store/hooks/typizedHooks';
import { serviceActions } from '@/store/slices/serviceSlice';
import { formatPrice } from '@/lib/utils/formatPrice';
import styles from './Services.module.css';

interface Props {
  services: SingleServiceType[];
};
const Services:React.FC<Props> = ({services}) => {
    const updateServices = services.map((service: SingleServiceType) => {
        return {
            ...service,
            price: formatPrice(service.price)
        }
    })
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(serviceActions.setServiceSlice(updateServices));
    }, [services]);
    return (
        <section>
            <h1>ODABERITE USLUGU</h1>
            <nav aria-label="Choose service navigation">
                <ul>
                    {services.map((service: SingleServiceType, index: number) => {
                        return <ServiceItem key={service.id} service={service} index={index}/>
                    })}
                    
                </ul>
            </nav>
        </section>
    );
};
export default Services;