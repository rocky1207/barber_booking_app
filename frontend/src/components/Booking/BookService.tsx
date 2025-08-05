"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { DayPicker} from "react-day-picker";
import 'react-day-picker/dist/style.css';
import styles from './Booking.module.css';


const BookService: React.FC = () => {
    const {services, choosenServices} = useAppSelector((state: RootState) => state?.service);
    console.log(services);
    const params = useSearchParams();
    const strBarberId = params.get('barberId');
    const barberId = strBarberId ? parseInt(strBarberId, 10) : null;
   // const service = services.find(service => service.id === serviceId);
   const selectedServices = services.map((service) => {
    return choosenServices.find((bla) => bla === service.id);

   })
   const [selected, setSelected] = useState<Date>();
    console.log(selected);
    return (
        
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            captionLayout="label"
            hidden={{
                before: new Date(),
                after: new Date(new Date().setMonth(new Date().getMonth()+3))
            }}
            footer={
                selected ? `Izabrani datum: ${selected.getDate().toString().padStart(2, '0')}/${(selected.getMonth() + 1).toString().padStart(2, '0')}/${selected.getFullYear()}` : "Izaberite datum."
            }
        />
        
    );
};
export default BookService;