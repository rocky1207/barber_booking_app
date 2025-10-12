import ClientAppointmentForm from "@/components/Forms/Appointments/ClientAppointmentForm/ClientAppointmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choosen appointments - Booking",
  description: "Check and manage your appointments",
};
const ClientPage = () => {
    
    return (
        <main className="wrapp">
            <h1>IZABRANI TERMINI</h1>
            <h2>Unesite podatke da biste videli vaše termine</h2>
            <ClientAppointmentForm />
        </main>
    );
};
export default ClientPage;