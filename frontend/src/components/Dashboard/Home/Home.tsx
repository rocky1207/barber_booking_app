"use client";
import {useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRouter } from 'next/navigation';
import UserNavigation from "../UserNavigation/UserNavigation";
import BarberItem from "@/components/Barbers/BarberItem";
import BarberButtons from "@/components/Barbers/BarberButtons";

interface BarberType {
  
file: string;
id: number;
password: string;
role: string;
username: string;
index?: number;
}


//const barbers = [{id: '1', name: 'Đole'}, {id: '2', name: 'Antoaneta'},{id: '3', name: 'Miša'},{id: '4', name: 'Mali Đole'}];
const Home: React.FC = () => {
  const [resData, setResData] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  const [barbers, setBarbers] = useState<BarberType[]>([]);
  const router = useRouter();
  useEffect(() => {
    
      const checkAuth = async ():Promise<void> => {
        try {
          const res = await api.get('user/getProfile.php');
          console.log(res.data);
          
          if(res.data.status !== 200) {
            router.push('/login');
          } else {
          // setResData(true);
            
            const res = await api.get('user/getUser.php');
            console.log(res.data);
            setBarbers(res.data);
            //if(res.data.status === 200) router.push('/login/dashboard');
          }
        } catch(err: any) {
          if(err.status === 401) {
            router.push('/login');
          } else {
            console.error(err.message);
            setErrMsg(err.message);
            
          } 
          } 
          setResData(true);
      } 
      
      checkAuth();
  }, []);
  console.log(errMsg);
  let view;
  if(!resData) {
    view = <h1>Loading...</h1>
  } else {
    view = 
    <>
    <h1>MENADŽERSKA TABLA</h1>
    {!errMsg ? <nav aria-label="Manage barber navigation">
      <UserNavigation />
      <ul>
        {barbers?.map((barber, index) => {
          //const barber: BarberType = {barberItem, index: index};
          return (
            <BarberItem  key={barber.id} {...barber} index={index}>
              <BarberButtons />
            </BarberItem>
          )
        })}
      </ul>
    </nav> : <p className="textCenter">{errMsg}</p>}
    </>
  }
    return (
        <section>
        {view}
        </section>
        
    );
};
export default Home;