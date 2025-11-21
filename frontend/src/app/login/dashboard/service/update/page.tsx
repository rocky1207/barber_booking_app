"use client";
import Update from "@/components/Forms/Service/UpdateForm/Update";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import Link from "next/link";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { forgotPasswordPageNav } from "@/datas/NavigationObjects";

const UpdatePage = () => {
    const id = useAppSelector((state: RootState) => state?.barber?.actionBarberId);
    const updatePageNav = {
        ...forgotPasswordPageNav,
        liItem: [
            {...forgotPasswordPageNav.liItem[0], text: 'dashboard', link: '/login/dashboard'},
            {...forgotPasswordPageNav.liItem[1], text: 'services', link: `/login/dashboard/service?barberId=${id}`}
        ]
    };
    return (
        <>
        <PageNavigation {...updatePageNav} />
        <main className="wrapp center">
            <h1>IZMENITE PODATKE</h1>
            <Update />
        </main>
        </>
    );
};
export default UpdatePage;