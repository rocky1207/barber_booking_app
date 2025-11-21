import ClientAppointmentForm from "@/components/Forms/Appointments/ClientAppointmentForm/ClientAppointment";
import ClientAppointments from "@/components/UI/Appointments/ClientAppointments";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { homePageNav } from "@/datas/NavigationObjects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choosen appointments - Booking",
  description: "Check and manage your appointments",
};
const ClientPage = () => {
    
    return (
        <>
        <PageNavigation {...homePageNav} />
        <main className="wrapp">
            <h1>IZABRANI TERMINI</h1>
            <h2>Unesite podatke da biste videli vaše termine</h2>
            <ClientAppointmentForm />
            <ClientAppointments />
        </main>
        </>
    );
};
export default ClientPage;