import Link from "next/link";
const Footer:React.FC = () => {
    return (
        <footer className="wrapp">
            <p><Link href="/admin">Klik</Link></p>
        </footer>
    );
};
export default Footer;