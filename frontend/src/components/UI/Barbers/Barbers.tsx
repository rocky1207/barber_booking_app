"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import BarberItem from "./BarberItem";
import { BarberItemPropsType } from "@/types/Barbers/BarberItemPropsType";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { uiActions } from "@/store/slices/UiSlice";
import { barberActions } from "@/store/slices/barberSlice";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import styles from './Barbers.module.css';
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";



const Barbers:React.FC<{barbers:BarberItemPropsType[]}> = ({barbers}) => {
  const dispatch = useAppDispatch();
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