"use client";
import { useRef } from "react";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import ServiceItem from "@/components/UI/Services/ServiceItem";
import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { useSearchParams } from "next/navigation";
import ConfirmModal from "@/components/UI/Modals/ConfirmModal/ConfirmModal";
import { deleteBtn } from "@/datas/ButttonObjects";
import { deleteItemsById } from "@/lib/api/deleteItemsById";
import { forgotPasswordPageNav } from "@/datas/NavigationObjects";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";

const ServicePage: React.FC = () => {
    const {services, serviceActionId } = useAppSelector((state: RootState) => state?.service);
    const {barbers} = useAppSelector((state: RootState) => state?.barber);
    const params = useSearchParams();
    const strBarberId = params.get('barberId');
    const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
    const userServices = services.filter(service => service.userId === barberId);
    const barber = barberId !== null && barbers.find((barber) => barber.id === barberId!);
    const dialog = useRef<HTMLDialogElement | null>(null);
    const barberUsername: string = barber ? barber.username.toUpperCase() : 'NULL';
    let showResult;
    if(!barberId) showResult = <p className="textCenter">Nije prosleđen pravilan ID frizera.</p>;
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
        id: serviceActionId,
        onAction: deleteItemsById
    };
    const servicePageNav = {
            ...forgotPasswordPageNav,
            liItem: [
                {...forgotPasswordPageNav.liItem[0], text: 'dashboard', link: '/login/dashboard'},
                {...forgotPasswordPageNav.liItem[1], text: 'UNESITE USLUGU', link: `/login/dashboard/service/insert?barberId=${barberId}`}
            ]
        };
    return (
        <>
        <ConfirmModal ref={dialog} {...deleteServiceBtn}/>
        <PageNavigation {...servicePageNav} />
        <main className="wrapp">
            <h1>USLUGE: <span>{barberUsername}</span></h1>
            {showResult}
        </main>
        </>
    );
};
export default ServicePage;