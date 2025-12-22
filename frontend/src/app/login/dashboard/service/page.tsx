"use client";
import { useRef } from "react";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import ServiceItem from "@/components/UI/Services/ServiceItem";
import Header from "@/components/UI/Header/Header";
import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { useSearchParams } from "next/navigation";
import ConfirmModal from "@/components/UI/Modals/ConfirmModal/ConfirmModal";
import { deleteBtn } from "@/datas/ButttonObjects";
import { deleteItemsById } from "@/lib/api/deleteItemsById";
import { clientsHeaderNav } from "@/datas/NavigationObjects";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";

const ServicePage: React.FC = () => {
    const {services, serviceActionId } = useAppSelector((state: RootState) => state?.service);
    const {barbers, actionBarberId} = useAppSelector((state: RootState) => state?.barber);
    
    // const params = useSearchParams();
   // const strBarberId = params.get('barberId');
    //const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
    const userServices = services.filter(service => service.userId === /*barberId*/actionBarberId);
    const barber = /*barberId !== null &&*/ barbers?.find((barber) => barber.id === /*barberId*/actionBarberId);
    const dialog = useRef<HTMLDialogElement | null>(null);
    const barberUsername: string = barber ? barber.username.toUpperCase() : 'NULL';
    
    let showResult;
    if(/*!barberId*/actionBarberId) showResult = <p className="textCenter">Nije prosleđen pravilan ID frizera.</p>;
    if(userServices.length > 0) {
        showResult = <nav aria-label="Choose service navigation">
                <ul>
                    {userServices.map((service: SingleServiceType, index: number) => {
                        return <ServiceItem key={service.id} service={service} index={index} showBtns={true} ref={dialog} />
                    })}
                    
                </ul>
            </nav>
    } else {
       showResult = <p className="textCenter">Nema unetih usluga za izabranog frizera.</p>;
    }
    const deleteServiceBtn = {
        ...deleteBtn,
        action: 'DELETE_SERVICE',
        id: 10000,
        onAction: deleteItemsById
    };
    const servicePageNav = {
            ...clientsHeaderNav,
            liItem: [
                {...clientsHeaderNav.liItem[0]},
                {...clientsHeaderNav.liItem[0], text: 'UNESITE USLUGU', link: `/login/dashboard/service/insert?barberId=${/*barberId*/actionBarberId}`},
                {text: '<<', link: '/login/dashboard', itemClass: 'separateLi'}
            ]
        };
    return (
        <>
        <ConfirmModal ref={dialog} {...deleteServiceBtn}/>
        <Header>
            <ClientNavigation {...servicePageNav} />
        </Header>
        <main className="wrapp">
            <h1 className="marginBottom">USLUGE: <span>{barberUsername}</span></h1>
            {showResult}
        </main>
        </>
    );
};
export default ServicePage;