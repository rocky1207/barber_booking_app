"use client";
import LogIn from "@/components/Forms/Barber/LoginForm/Login";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";

const LogInPage:React.FC = () => {
    const navigationData = {
        navClass: 'wrapp',
        ulClass: '',
        liItem: [{link: "/", text: 'početna', itemClass: ''}]
    }
    return (
        <>
        <PageNavigation {...navigationData} />
        <main className="wrapp center">
            <h1>UNESITE VAŠE PODATKE</h1>
            <LogIn/>
        </main>
        </>
    );
};
export default LogInPage;