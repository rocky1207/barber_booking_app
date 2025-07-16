
import Header from "@/components/UI/Header/Header";
import Services from "@/components/UI/Services/Services";
import { getUserServices } from "@/lib/api/service/getUserServices";
import { apiRoutes } from "@/lib/api/apiRoutes/apiRoutes";

const ServicesPage = async ({ searchParams }: { searchParams: Promise<{ barberId: string }> }) => {
    const {barberId} = await searchParams;
    const id = barberId ? parseInt(barberId, 10) : null;
    if(!id) {
        return <div>Nijedan frizer nije pronađen</div>
    }
    const services = await getUserServices(apiRoutes.GET_USER_SERVICES, id);
    return (
        <>
        <Header />
        <main className="wrapp">
            <Services />
        </main>
        </>
    );
};
export default ServicesPage;