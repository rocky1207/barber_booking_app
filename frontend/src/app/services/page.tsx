
import Header from "@/components/UI/Header/Header";
import Services from "@/components/UI/Services/Services";
//import { getAllServices } from "@/lib/api/service/getAllServices";
import { getUsersAndServices } from "@/lib/api/getUsersAndServices";
//import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
import { formatPrice } from "@/lib/utils/formatPrice";
//import { manageService } from "@/lib/api/service/manageService";
//import { GetServicesReturnType } from "@/types/Api/ReturnServiceType";
import { SingleServiceType } from "@/types/Api/ReturnServiceType";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { servicesPageNav } from "@/datas/NavigationObjects";
import SelectedServices from "@/components/UI/Services/SelectedServices";

const ServicesPage = async ({ searchParams }: { searchParams: Promise<{ barberId: string }> }) => {
    const {barberId} = await searchParams;
    const id = parseInt(barberId, 10);
    let noIdbackUp;
    if(!id) noIdbackUp = <p>Ne postoji frizer sa ovim ID</p>
   // console.log(apiRoutes.GET_ALL_SERVICES);
    //const {success, message, data} = await getAllServices(apiRoutes.GET_ALL_SERVICES);
   const {success, message, data} = await getUsersAndServices('GET_ALL_SERVICES');
    console.log(data);
    const servicesData = data as SingleServiceType[]
    const services = servicesData?.map((service) => {
        return {
            ...service,
            price: formatPrice(service.price)
        }
    });
    
    return (
        <>
        <Header />
        <PageNavigation {...servicesPageNav} />
        <main className="wrapp">
            {!id ? noIdbackUp : !success ? <p className="textCenter">{message}</p> :  
            success && message ? <p className="textCenter">{message}</p> :
            <Services services={services as SingleServiceType[]} />}
            
        </main>
        <SelectedServices />
        </>
    );
};
export default ServicesPage;