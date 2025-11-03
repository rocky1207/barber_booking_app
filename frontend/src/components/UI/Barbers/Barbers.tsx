"use client";
import { useEffect } from "react";
import BarberItem from "./BarberItem";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { barberActions } from "@/store/slices/barberSlice";
import { serviceActions } from "@/store/slices/serviceSlice";
import { appointmentActions } from "@/store/slices/appointmentSlice";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import styles from './Barbers.module.css';

const Barbers:React.FC<{allBarbers:BasicBarberType[]}> = ({allBarbers}) => {
  const {choosenServices} = useAppSelector((state: RootState) => state?.service);
  //const {clientTerm} = useAppSelector((state: RootState) => state?.appointment);
  console.log(choosenServices); 
  const dispatch = useAppDispatch();
  const barbers = allBarbers.filter(barberItem => barberItem.role !== 'owner');
  console.log(barbers);
  useEffect(() => {
    choosenServices.length > 0 && dispatch(serviceActions.setChoosenServices([]));
    dispatch(appointmentActions.setSelectedTerm({date: '', time: ''}));
    dispatch(appointmentActions.setClientTerms([]));
    setIsLoadingState(false, dispatch);
    }, []);
  useEffect(() => {
   dispatch(barberActions.setBarbers(barbers));
  }, [barbers]);
  
    return (
        <section className={styles.barbers}>
          <h1>IZABERI SVOG FRIZERA</h1>
          <nav aria-label="Choose barber navigation">
            <ul>
              {barbers.map((barberItem, index) => {
                const barber = {...barberItem, index: index};
                return (
                  barberItem.suspended !== 1 && <BarberItem  key={barber.id} {...barber} />
                )
              })}
            </ul>
          </nav>
        </section>
    );
};
export default Barbers;