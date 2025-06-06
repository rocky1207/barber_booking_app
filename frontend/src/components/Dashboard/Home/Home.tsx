"use client";
import {useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRouter } from 'next/navigation';
import BarberItem from "@/components/Barbers/BarberItem";
import BarberButtons from "@/components/Barbers/BarberButtons";


const barbers = [{id: '1', name: 'Đole'}, {id: '2', name: 'Antoaneta'},{id: '3', name: 'Miša'},{id: '4', name: 'Mali Đole'}];
const Home: React.FC = () => {
  const [resData, setResData] = useState('')
  const router = useRouter();
  useEffect(() => {
      const checkAuth = async ():Promise<void> => {
        try {
          const res = await api.get('user/getProfile.php');
          console.log(res.data);
          
          if(!res.data) {
            router.push('/login');
          } else {
            setResData(res.data.data);
          }
        } catch(err: any) {
          if(err.status === 401) {
            router.push('/login');
          } else {
            console.error(err);
          } 
          } 
      } 
      checkAuth();
  }, []);
  let bla;
  if(!resData) {
    bla = <h1>Loading...</h1>
  } else {
    bla = 
    <>
    <h1>MENADŽERSKA TABLA</h1>
        <nav aria-label="Manage barber navigation">
            <ul>
              {barbers.map((barberItem, index) => {
                const barber = {...barberItem, index: index};
                return (
                  <BarberItem  key={barber.id} {...barber}>
                    
                    <BarberButtons />
                  </BarberItem>
                )
              })}
                
              
            </ul>
        </nav>
        </>
  }
    return (
        <section>
        {bla}

        </section>
        
    );
};
export default Home;