'use client';
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { formatDate } from "@/lib/utils/formatDate";
import { formatPrice } from "@/lib/utils/formatPrice";
const ClientAppointments: React.FC = () => {
    const {clientTerms} = useAppSelector((state: RootState) => state.appointment);
    console.log(clientTerms);
    return (
        <section>
        <h2>{clientTerms[0].name} {clientTerms[0].surname}</h2>
        <ul>
            {clientTerms.map((term) => {
               
                const date = formatDate(new Date(term.date));
                const time = term.time.split(':').slice(0, 2).join(':');
                const price = formatPrice(term.servicePrice);
                return <li key={term.appointmentId}>
                    <p>{date} - {time}h</p>
                    <p>{term.serviceName}</p>
                    <p>{price}din.</p>
                </li>
            })}
        </ul>
        </section>
        
    );
};
export default ClientAppointments;