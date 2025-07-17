
import Header from "@/components/UI/Header/Header";
import Services from "@/components/UI/Services/Services";
import { getUserServices } from "@/lib/api/service/getUserServices";
import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";
import Link from "next/link";

const ServicesPage = async ({ searchParams }: { searchParams: Promise<{ barberId: string }> }) => {
    const {barberId} = await searchParams;
    const id = parseInt(barberId, 10);
    let noIdbackUp;
    if(!id) noIdbackUp = <p>Ne postoji frizer sa ovim ID</p>
    const {success, message, data} = await getUserServices(apiRoutes.GET_USER_SERVICES, id);
    
    return (
        <>
        <Header />
        <nav className="wrapp">
            <ul>
                <li><Link href="/">back</Link></li>
            </ul>
        </nav>
        <main className="wrapp">
            {!id ? noIdbackUp : !success ? <p className="textCenter">{message}</p> :  
            success && message ? <p className="textCenter">{message}</p> :
            <Services services={data ?? []} />}
        </main>
        </>
    );
};
export default ServicesPage;