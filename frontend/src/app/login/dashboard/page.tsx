import Home from "@/components/UI/Dashboard/Home/Home";
import Header from "@/components/UI/Header/Header";
const DashboardPage: React.FC = () => {
    return (
        <>
        <Header />
        <main className="wrapp">
            <Home />
        </main>
        </>
    );
};
export default DashboardPage;