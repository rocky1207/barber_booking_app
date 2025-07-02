"use client";
import ChangePasswordForm from "@/components/Forms/ChangePasswordForm/ChangePasswordForm";
import Link from "next/link";
const ChangePasswordPage: React.FC = () => {
    return (
        <>
        <nav className="wrapp">
            <ul>
                <li><Link href="/login/dashboard">back</Link></li>
            </ul>
        </nav>
        <main className="wrapp center">
            <h1>PROMENI LOZINKU</h1>
        <ChangePasswordForm />
        </main>
        
        </>
    );
};
export default ChangePasswordPage;