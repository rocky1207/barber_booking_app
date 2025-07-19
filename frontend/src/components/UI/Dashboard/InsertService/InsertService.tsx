"use client";
import Link from "next/link";
import Service from "@/components/Forms/ServiceForm/Service";
const InsertService: React.FC = () => {
    return (
        <>
        <nav className="wrapp">
            <ul>
                <li><Link href="/login/dashboard">back</Link></li>
            </ul>
        </nav>
        <main className="wrapp center">
            <h1>UNESITE USLUGU</h1>
            <Service />
        </main>
        </>
    );
};
export default InsertService;