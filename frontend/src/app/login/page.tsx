"use client";
import { useEffect } from "react";
import LogIn from "@/components/Forms/Barber/LoginForm/Login";
import Header from "@/components/UI/Header/Header";
import Link from "next/link";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import { clientsHeaderNav } from "@/datas/NavigationObjects";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";

const LogInPage:React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {setIsLoadingState(false, dispatch)}, []);
    const loginHeaderNav = {
        ...clientsHeaderNav,
        liItem: [{text: 'POČETNA', itemClass: 'clientHeaderLi', link: '/'}]
    }
    return (
        <>
        <Header>
            <ClientNavigation {...loginHeaderNav} />
        </Header>
        <main className="wrapp center">
            <h1>UNESITE VAŠE PODATKE</h1>
            <LogIn/>
            <p className="link"><Link href='/forgot-password'>Zaboravljena lozinka?</Link></p>
        </main>
       
        </>
    );
};
export default LogInPage;