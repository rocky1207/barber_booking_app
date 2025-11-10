"use client";
import LogIn from "@/components/Forms/Barber/LoginForm/Login";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import Link from "next/link";
import { adminPageNav } from "@/datas/NavigationObjects";

const LogInPage:React.FC = () => {
    return (
        <>
        <PageNavigation {...adminPageNav} />
        <main className="wrapp center">
            <h1>UNESITE VAŠE PODATKE</h1>
            <LogIn/>
            <p><Link href='/forgot-password'>Zaboravljena lozinka?</Link></p>
        </main>
        </>
    );
};
export default LogInPage;