"use client";
import ChangePassword from "@/components/Forms/Barber/ChangePasswordForm/ChangePassword";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { forgotPasswordPageNav } from "@/datas/NavigationObjects";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";

const ChangePasswordPage: React.FC = () => {
    const {actionBarberId} = useAppSelector((state: RootState) => state?.barber);
    const changePasswordNav = {
    ...forgotPasswordPageNav,
    liItem: [
        {...forgotPasswordPageNav.liItem[0], text: '<<', link:`/login/dashboard/user/update?barberId=${actionBarberId}`},
        {...forgotPasswordPageNav.liItem[1], text: 'dashboard', link: '/login/dashboard'}
    ]
};
    return (
        <>
        <PageNavigation {...changePasswordNav} />
        <main className="wrapp center">
            <h1>PROMENI LOZINKU</h1>
        <ChangePassword />
        </main>
        
        </>
    );
};
export default ChangePasswordPage;