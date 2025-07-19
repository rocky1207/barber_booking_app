"use client";
import Link from "next/link";
import Header from "@/components/UI/Header/Header";
import Services from "@/components/UI/Services/Services";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import ServiceItem from "@/components/UI/Services/ServiceItem";
import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { useSearchParams } from "next/navigation";
const ServicePage: React.FC = () => {
    const {services} = useAppSelector((state: RootState) => state.service);
    const params = useSearchParams();
    const barberId = params.get('id');
    console.log(barberId);
    console.log(services);
    return (
        <>
        <Header />
        <nav className="wrapp">
            <ul>
                <li><Link href="/login/dashboard">back</Link></li>
            </ul>
        </nav>
        <main className="wrapp">
            <h1>USLUGE: <span>MARIJA</span></h1>
            <nav aria-label="Choose service navigation">
                <ul>
                    {services.map((service: SingleServiceType, index: number) => {
                        return <ServiceItem key={service.id} service={service} index={index}/>
                    })}
                    
                </ul>
            </nav>
        </main>
        </>
    );
};
export default ServicePage;