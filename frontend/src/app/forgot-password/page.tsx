"use client";
import ForgotPassword from "@/components/Forms/Barber/ForgotPasswordForm/ForgotPassword";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import { forgotPasswordPageNav } from "@/datas/NavigationObjects";
import Header from "@/components/UI/Header/Header";

const ForgotPasswordPage: React.FC = () => {
    return (
        <>
        <Header>
            <ClientNavigation {...forgotPasswordPageNav} />
        </Header>
        <main className="wrapp center">
        <h1>Unesite svoj Email</h1>
        <ForgotPassword />
        </main>
        </>
    );
};
export default ForgotPasswordPage;