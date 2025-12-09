import Header from "@/components/UI/Header/Header";
import CalendarClient from "@/components/UI/Appointments/CalendarClient";
import AvailableAppointments from "@/components/UI/Appointments/AvailableAppointments";
import SelectedServices from "@/components/UI/Services/SelectedServices";
import { clientsHeaderNav } from "@/datas/NavigationObjects";

interface Props {
    searchParams: Promise<{barberId: string; serviceId: string}>
}
    
const BookingPage = async ({searchParams}: Props) => {
    const params = await searchParams;
    const updatedClientHeaderNav = {
        ...clientsHeaderNav,
        liItem: [
            {...clientsHeaderNav.liItem[0]}, 
            {link: `/services?barberId=${params.barberId}`, text: '<<', itemClass: 'separateLi'}
        ]
    }
    return (
        <>
        <Header {...updatedClientHeaderNav} />
        <main className="wrapp middle">
            <CalendarClient />
            <AvailableAppointments />
        </main>
        <SelectedServices />
        </>
    )
}
export default BookingPage;