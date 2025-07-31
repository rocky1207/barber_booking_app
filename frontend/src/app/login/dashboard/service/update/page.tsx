"use client";
import Update from "@/components/Forms/Service/UpdateForm/Update";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import Link from "next/link";
const UpdatePage = () => {
    const id = useAppSelector((state: RootState) => state?.barber?.actionBarberId)
    return (
        <>
        <nav className="wrapp">
            <ul className="flexed">
                <li><Link href="/login/dashboard">dashboard</Link></li>
                <li><Link href={`/login/dashboard/service?barberId=${id}`}>services</Link></li>
            </ul>
        </nav>
        <main className="wrapp center">
            <h1>IZMENITE PODATKE</h1>
            <Update />
        </main>
        </>
    );
};
export default UpdatePage;