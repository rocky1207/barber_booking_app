"use client";
import LogIn from "@/components/Forms/Barber/LoginForm/Login";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { adminPageNav } from "@/datas/NavigationObjects";

const LogInPage:React.FC = () => {
    return (
        <>
        <PageNavigation {...adminPageNav} />
        <main className="wrapp center">
            <h1>UNESITE VAŠE PODATKE</h1>
            <LogIn/>
        </main>
        </>
    );
};
export default LogInPage;