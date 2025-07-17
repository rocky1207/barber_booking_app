import Link from "next/link";
interface Props {
    searchParams: Promise<{userId: string; serviceId: string}>
}
const BookingPage = async ({searchParams}: Props) => {
    const params = await searchParams;
    console.log(params);
    return (
        <>
        <nav className="wrapp">
            <ul>
                <li><Link href="/">back</Link></li>
            </ul>
        </nav>
        <main className="wrapp center">
            <h1>UNESITE VAŠE PODATKE</h1>
        </main>
        </>
    )
}
export default BookingPage;