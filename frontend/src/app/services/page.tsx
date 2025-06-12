import Header from "@/components/UI/Header/Header";
import Services from "@/components/UI/Services/Services";
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