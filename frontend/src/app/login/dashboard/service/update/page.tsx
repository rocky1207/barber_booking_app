import Update from "@/components/Forms/Service/UpdateForm/Update";
import Link from "next/link";
const UpdatePage = () => {
    return (
        <>
        <nav className="wrapp">
            <ul>
                <li><Link href="/login/dashboard">dashboard</Link></li>
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