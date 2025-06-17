"use client";
import LogIn from "@/components/Forms/LoginForm/Login";
import Link from "next/link";
const LogInPage:React.FC = () => {
    return (
        <>
        <nav className="wrapp">
            <ul>
                <li><Link href="/">back</Link></li>
            </ul>
        </nav>
        <main className="wrapp center">
            <h1>UNESITE VAŠE PODATKE</h1>
            <LogIn/>
        </main>
        </>
    );
};
export default LogInPage;