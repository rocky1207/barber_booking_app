"user client";
import Register from "@/components/Forms/Barber/RegisterForm/Register";
import Header from "@/components/UI/Header/Header";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import { clientsHeaderNav } from "@/datas/NavigationObjects";

const RegisterPage: React.FC = () => {
    const appointmentsNav = {
        ...clientsHeaderNav,
        liItem: [{text: 'MENADŽERSKA TABLA', itemClass: '', link: '/login/dashboard'}]
    } 
    return (
        <>
        <Header>
            <ClientNavigation {...appointmentsNav} />
        </Header>
        <main className="wrapp center">
            <h1 className="margin-bottom">UNESITE KORISNIKA</h1>
            <Register/>
        </main>
        </>
    )
};
export default RegisterPage;