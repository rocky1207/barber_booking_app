import Header from "@/components/UI/Header/Header";
import Services from "@/components/UI/Services/Services";
import { getUsersAndServices } from "@/lib/api/getUsersAndServices";
import { formatPrice } from "@/lib/utils/formatPrice";
import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import { clientsHeaderNav } from "@/datas/NavigationObjects";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { servicesPageNav } from "@/datas/NavigationObjects";
import Logo from "@/components/UI/Logo/Logo";
import SelectedServices from "@/components/UI/Services/SelectedServices";

const ServicesPage = async ({ searchParams }: { searchParams: Promise<{ barberId: string }> }) => {
    const {barberId} = await searchParams;
    const id = parseInt(barberId, 10);
    let noIdbackUp;
    if(!id) noIdbackUp = <p>Ne postoji frizer sa ovim ID</p>
    const {success, message, data} = await getUsersAndServices('GET_ALL_SERVICES');
    const servicesData = data as SingleServiceType[]
    const services = servicesData?.map((service) => {
        return {
            ...service,
            price: formatPrice(service.price)
        }
    });
    
    return (
        <>
        <Header {...clientsHeaderNav} />
        <main className={`wrapp`}>
            {!id ? noIdbackUp : !success ? <p className="textCenter">{message}</p> :  
            success && message ? <p className="textCenter">{message}</p> :
            <Services services={services as SingleServiceType[]} />}
        </main>
        <SelectedServices />
        </>
    );
};
export default ServicesPage;