"use client";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import ResetPassword from "@/components/Forms/Barber/ResetPasswordForm/ResetPassword";
import { resetPasswordPageNav } from "@/datas/NavigationObjects";

const ResetPasswordPage:React.FC = () => {
    return (
         <>
        <PageNavigation {...resetPasswordPageNav}/>
        <main className="wrapp center">
        <ResetPassword  />
        </main>
        </>
    );
};
export default ResetPasswordPage;