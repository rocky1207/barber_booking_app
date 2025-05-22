import Header from "@/components/Header/Header";
import Services from "@/components/Services/Services";
const ServicesPage:React.FC = () => {
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