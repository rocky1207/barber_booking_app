import Header from "@/components/UI/Header/Header";
import Calendar from "@/components/UI/Appointments/Calendar";
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
        liItem: [...clientsHeaderNav.liItem, {link: `/services?barberId=${params.barberId}`, text: '<<', itemClass: 'separateLi'}]
    }
    return (
        <>
        <Header {...updatedClientHeaderNav} />
        <main className="wrapp middle">
            <Calendar />
            <AvailableAppointments />
        </main>
        <SelectedServices />
        </>
    )
}
export default BookingPage;