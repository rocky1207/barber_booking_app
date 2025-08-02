import BookService from "@/components/Booking/BookService";
import Link from "next/link";

interface Props {
    searchParams: Promise<{barberId: string; serviceId: string}>
}
    
const BookingPage = async ({searchParams}: Props) => {
    const params = await searchParams;
    return (
        <>
        <nav className="wrapp">
            <ul className="flexed">
                <li><Link href="/">home</Link></li>
                <li><Link href={`/services?barberId=${params.barberId}`}>usluge</Link></li>
            </ul>
        </nav>
        <main className="wrapp">
            <BookService />
        </main>
        </>
    )
}
export default BookingPage;