"use client";
import ForgotPassword from "@/components/Forms/Barber/ForgotPasswordForm/ForgotPassword";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import { clientsHeaderNav } from "@/datas/NavigationObjects";
import Header from "@/components/UI/Header/Header";

const ForgotPasswordPage: React.FC = () => {
    const forgotPasswordNav = {
        ...clientsHeaderNav,
        liItem: [
            {...clientsHeaderNav.liItem[0]},
            {text: '<<', itemClass: 'separateLi', link: '/login'}
        ]
    };
    return (
        <>
        <Header>
            <ClientNavigation {...forgotPasswordNav} />
        </Header>
        <main className="wrapp center">
        <h1>Unesite svoj Email</h1>
        <ForgotPassword />
        </main>
        </>
    );
};
export default ForgotPasswordPage;