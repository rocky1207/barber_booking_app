import Home from "@/components/Dashboard/Home/Home";
import Header from "@/components/Header/Header";
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