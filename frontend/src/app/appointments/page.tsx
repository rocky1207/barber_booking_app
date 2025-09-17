import Calendar from "@/components/UI/Appointments/Calendar";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import AvailableAppointments from "@/components/UI/Appointments/AvailableAppointments";
import SelectedServices from "@/components/UI/Services/SelectedServices";
interface Props {
    searchParams: Promise<{barberId: string; serviceId: string}>
}
    
const BookingPage = async ({searchParams}: Props) => {
    const params = await searchParams;
    const navigationData = {
        navClass: 'wrapp',
        ulClass: 'flexed',
        liItem: [{link: `/services?barberId=${params.barberId}`, text: '<<', itemClass: ''}, {link: "/", text: 'početna', itemClass: ''}]
    }
    return (
        <>
        <PageNavigation {...navigationData} />
        <main className="middle">
            <Calendar />
            <AvailableAppointments />
        </main>
        <SelectedServices />
        </>
    )
}
export default BookingPage;