"use client";
import ChangePassword from "@/components/Forms/Barber/ChangePasswordForm/ChangePassword";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import { clientsHeaderNav } from "@/datas/NavigationObjects";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import Header from "@/components/UI/Header/Header";

const ChangePasswordPage: React.FC = () => {
    const {actionBarberId} = useAppSelector((state: RootState) => state?.barber);
    const changePasswordNav = {
    ...clientsHeaderNav,
    liItem: [
        {...clientsHeaderNav.liItem[0]},
        {...clientsHeaderNav.liItem[0], text: 'MENADŽERSKA TABLA', link: '/login/dashboard'},
        {...clientsHeaderNav.liItem[0], text: '<<', itemClass: 'separateLi', link:`/login/dashboard/user/update?barberId=${actionBarberId}`}
    ]
};
    return (
        <>
        <Header>
            <ClientNavigation {...changePasswordNav} />
        </Header>
        <main className="wrapp center">
            <h1>PROMENI LOZINKU</h1>
        <ChangePassword />
        </main>
        
        </>
    );
};
export default ChangePasswordPage;