'use client';
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { formatDate } from "@/lib/utils/formatDate";
import { formatPrice } from "@/lib/utils/formatPrice";
import styles from './Appointments.module.css';
const ClientAppointments: React.FC = () => {
    const {clientTerms} = useAppSelector((state: RootState) => state.appointment);
    console.log(clientTerms);
    return (
        <section className={styles.clientAppointment}>
        <h2>{clientTerms[0]?.name} {clientTerms[0]?.surname}</h2>
        <ul>
            { clientTerms.map((term) => {
               
                const date = formatDate(new Date(term.date));
                const time = term.time.split(':').slice(0, 2).join(':');
                const price = formatPrice(term.servicePrice);
                return (
                    <li key={term.appointmentId} className="flexed">
                        <div className={styles.info}>
                            <h3>Frizer: {term.barber}</h3>
                            <p>Datum: {date}</p>
                            <p>Vreme: {time}h</p>
                            <p>Usluga: {term.serviceName}</p>
                            <p>Cena: {price}din.</p>
                        </div>
                        <div className={styles.action}>
                            <button>OTKAŽI TERMIN</button>
                        </div>
                    </li>
                );
            })}
        </ul>
        </section>
        
    );
};
export default ClientAppointments;