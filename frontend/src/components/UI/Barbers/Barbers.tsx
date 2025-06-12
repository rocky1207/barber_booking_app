"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import BarberItem from "./BarberItem";
import { BarberItemPropsType } from "@/types/Barbers/BarberItemPropsType";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { uiActions } from "@/store/slices/UiSlice";
import styles from './Barbers.module.css';


const Barbers:React.FC = () => {
  const [barbers, setBarbers] = useState<BarberItemPropsType[]>([]);
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getUser = async () => {
      dispatch(uiActions.setIsLoading(true));
      try {
        const res = await api.get('user/getUser.php');
        console.log(res);
        if(res.status === 200) {
          setBarbers(res.data)
        }
        
      } catch(error: any) {
        console.log(error);

      } finally {
        dispatch(uiActions.setIsLoading(false));
      }
    }
    getUser();
  }, []);
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