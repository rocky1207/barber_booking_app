"user client";
import Register from "@/components/Forms/Barber/RegisterForm/Register";
import PageNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import { appointmentsPageNav } from "@/datas/NavigationObjects";

const RegisterPage: React.FC = () => {
    return (
        <>
        <PageNavigation {...appointmentsPageNav} />
        <main className="wrapp center">
            <h1>UNESITE KORISNIKA</h1>
            <Register/>
        </main>
        </>
    )
};
export default RegisterPage;