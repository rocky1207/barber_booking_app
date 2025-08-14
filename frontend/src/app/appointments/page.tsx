import Calendar from "@/components/UI/Appointments/Calendar";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import AvailableAppointments from "@/components/UI/Appointments/AvailableAppointments";
interface Props {
    searchParams: Promise<{barberId: string; serviceId: string}>
}
    
const BookingPage = async ({searchParams}: Props) => {
    const params = await searchParams;
    const navigationData = {
        navClass: 'wrapp',
        ulClass: 'flexed',
        liItem: [{link: "/", text: 'početna', itemClass: ''}, {link: `/services?barberId=${params.barberId}`, text: 'usluge', itemClass: ''}]
    }
    return (
        <>
        <PageNavigation {...navigationData} />
        <main className="middle">
            <Calendar />
            <AvailableAppointments />
        </main>
        </>
    )
}
export default BookingPage;