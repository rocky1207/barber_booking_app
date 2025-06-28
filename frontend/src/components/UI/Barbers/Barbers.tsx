"use client";
import { useEffect } from "react";
import BarberItem from "./BarberItem";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { barberActions } from "@/store/slices/barberSlice";
import styles from './Barbers.module.css';

//const barbers = [{id: 1, username: "Rocky", role: "owner", file: ''}];
const Barbers:React.FC<{allBarbers:BasicBarberType[]}> = ({allBarbers}) => {
  const dispatch = useAppDispatch();
  const barbers = allBarbers.filter(barberItem => barberItem.role !== 'owner');
 
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
                  <BarberItem  key={barber.id} {...barber} />
                )
              })}
            </ul>
          </nav>
        </section>
    );
};
export default Barbers;