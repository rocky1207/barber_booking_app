
import Header from "@/components/UI/Header/Header";
import Services from "@/components/UI/Services/Services";
import { getAllServices } from "@/lib/api/service/getAllServices";
import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
import { formatPrice } from "@/lib/utils/formatPrice";
import { manageService } from "@/lib/api/service/manageService";
import { GetServicesReturnType } from "@/types/Api/ReturnServiceType";
import Link from "next/link";

const ServicesPage = async ({ searchParams }: { searchParams: Promise<{ barberId: string }> }) => {
    const {barberId} = await searchParams;
    const id = parseInt(barberId, 10);
    let noIdbackUp;
    if(!id) noIdbackUp = <p>Ne postoji frizer sa ovim ID</p>
   // console.log(apiRoutes.GET_ALL_SERVICES);
    const {success, message, data} = await getAllServices(apiRoutes.GET_ALL_SERVICES);
   
    console.log(data);
    const services = data?.map((service) => {
        return {
            ...service,
            price: formatPrice(service.price)
        }
    })
    return (
        <>
        <Header />
        <nav className="wrapp">
            <ul>
                <li><Link href="/">home</Link></li>
            </ul>
        </nav>
        <main className="wrapp">
            {!id ? noIdbackUp : !success ? <p className="textCenter">{message}</p> :  
            success && message ? <p className="textCenter">{message}</p> :
            <Services services={services ?? []} />}
        </main>
        </>
    );
};
export default ServicesPage;