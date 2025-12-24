"use client";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import ResetPassword from "@/components/Forms/Barber/ResetPasswordForm/ResetPassword";
import { resetPasswordPageNav } from "@/datas/NavigationObjects";
import Header from "@/components/UI/Header/Header";

const ResetPasswordPage:React.FC = () => {
    return (
         <>
        <Header>
            <ClientNavigation {...resetPasswordPageNav} />
        </Header>
        <main className="wrapp center">
            <ResetPassword  />
        </main>
        </>
    );
};
export default ResetPasswordPage;