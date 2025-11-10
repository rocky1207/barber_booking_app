"use client";
import ForgotPassword from "@/components/Forms/Barber/ForgotPasswordForm/ForgotPassword";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { forgotPasswordPageNav } from "@/datas/NavigationObjects";
const ForgotPasswordPage: React.FC = () => {
    return (
        <>
        <PageNavigation {...forgotPasswordPageNav}/>
        <main className="wrapp center">
        <h1>Unesite svoj Email</h1>
        <ForgotPassword />
        </main>
        </>
    );
};
export default ForgotPasswordPage;