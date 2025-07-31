"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Header from "@/components/UI/Header/Header";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import ServiceItem from "@/components/UI/Services/ServiceItem";
import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { useSearchParams } from "next/navigation";
import ConfirmModal from "@/components/UI/ConfirmModal/ConfirmModal";
import { deleteBarberBtn } from "@/datas/ButttonObjects";
import { manageService } from "@/lib/api/service/manageService";

const ServicePage: React.FC = () => {
    const {services} = useAppSelector((state: RootState) => state.service);
    const {barbers} = useAppSelector((state: RootState) => state.barber);
    const [deleteServiceId, setDeleteServiceId] = useState<number>(0);
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
                        return <ServiceItem key={service.id} service={service} index={index} showBtns={true} ref={dialog} setDeleteServiceId={setDeleteServiceId} />
                    })}
                    
                </ul>
            </nav>
    } else {
       showResult = <p className="textCenter">Nema unetih usluga za izabranog frizera.</p>;
    }
    const updatedBarberBtn = {
        ...deleteBarberBtn,
        action: 'DELETE_SERVICE',
        id: deleteServiceId,
        head: 'Da li ste sigurni?',
        onAction: manageService
    };
    console.log(updatedBarberBtn);
    
    return (
        <>
        <ConfirmModal ref={dialog} {...updatedBarberBtn}/>
        <Header />
        <nav className="wrapp">
            <ul className="flexed">
                <li><Link href="/login/dashboard">dashboard</Link></li>
                <li><Link href={`/login/dashboard/service/insert?barberId=${barberId}`}>UNESITE USLUGU</Link></li>
            </ul>
        </nav>
        <main className="wrapp">
            <h1>USLUGE: <span>{barberUsername}</span></h1>
            {showResult}
        </main>
        </>
    );
};
export default ServicePage;