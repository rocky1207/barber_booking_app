import ClientAppointmentForm from "@/components/Forms/Appointments/ClientAppointmentForm/ClientAppointment";
import ClientAppointments from "@/components/UI/Appointments/ClientAppointments";
import Header from "@/components/UI/Header/Header";
import { clientsHeaderNav } from "@/datas/NavigationObjects";
import LocationMap from "@/components/UI/LocationMap/LocationMap";
import Footer from "@/components/UI/Footer/Footer";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import styles from '@/components/UI/Appointments/Appointments.module.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choosen appointments - Booking",
  description: "Check and manage your appointments",
};
const ClientPage = () => {
    const choosenTermsNav = {
        ...clientsHeaderNav,
        liItem: [
            {text: 'POČETNA', itemClass: 'clientHeaderLi', link: '/'}
        ]
    }
    return (
        <>
        <Header>
            <ClientNavigation {...choosenTermsNav } />
        </Header>
        <main className="wrapp wrappMargin">
            <h1 className="choosenTermsh1">PREGLED ZAKAZANIH TERMINA</h1>
            <ClientAppointmentForm />
            <ClientAppointments />
            <div className={styles.separateDiv}>
                <LocationMap />
            </div>
        </main>
        <Footer />
        </>
    );
};
export default ClientPage;