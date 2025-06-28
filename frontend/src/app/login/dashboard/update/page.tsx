"use client";
import Link from "next/link";
import Update from "@/components/Forms/UpdateForm/Update"
import { useSearchParams } from "next/navigation";
const UpdatePage: React.FC = () => {
    const params = useSearchParams();
    const id = params.get('id');
    console.log(id);
    return (
        <>
        <nav className="wrapp">
            <ul>
                <li><Link href="/login/dashboard">back</Link></li>
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