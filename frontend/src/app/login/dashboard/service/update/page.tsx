"use client";
import Update from "@/components/Forms/Service/UpdateForm/Update";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import Header from "@/components/UI/Header/Header";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import { clientsHeaderNav } from "@/datas/NavigationObjects";

const UpdatePage = () => {
    const id = useAppSelector((state: RootState) => state?.barber?.actionBarberId);
    
    const updateServiceNav = {
        ...clientsHeaderNav,
        liItem: [
            {...clientsHeaderNav.liItem[0]},
            {...clientsHeaderNav.liItem[0], text: 'MENADŽERSKA TABLA', link: '/login/dashboard'},
            {itemClass: 'separateLi', text: '<<', link: `/login/dashboard/service?barberId=${id}`}
        ]
    };
    return (
        <>
        <Header>
            <ClientNavigation {...updateServiceNav} />
        </Header>
        <main className="wrapp center">
            <h1 className="margin-bottom">IZMENITE PODATKE</h1>
            <Update />
        </main>
        </>
    );
};
export default UpdatePage;