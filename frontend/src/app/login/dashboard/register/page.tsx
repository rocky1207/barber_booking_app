import Link from "next/link";
import Register from "@/components/Forms/RegisterForm/Register";

const RegisterPage: React.FC = () => {
    return (
        <>
        <nav className="wrapp">
            <ul>
                <li><Link href="/login/dashboard">back</Link></li>
            </ul>
        </nav>
        <main className="wrapp center">
            <h1>UNESITE KORISNIKA</h1>
            <Register/>
        </main>
        </>
    )
};
export default RegisterPage;