"use client";
import {useState, useEffect, useRef } from "react";
import api from "@/lib/axios";
import { useRouter } from 'next/navigation';
import UserNavigation from "../UserNavigation/UserNavigation";
import BarberItem from "@/components/UI/Barbers/BarberItem";
import BarberButtons from "@/components/UI/Barbers/BarberButtons";
import { uiActions } from "@/store/slices/UiSlice";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import { text } from "stream/consumers";

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
  const [errMsg, setErrMsg] = useState<string>('');
  //const [barbers, setBarbers] = useState<BarberType[]>([]);
  const dialog = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const barbers = useAppSelector((state: RootState) => state.barber?.barbers);
  /*
  useEffect(() => {
    
      const checkAuth = async ():Promise<void> => {
        dispatch(uiActions.setIsLoading(true));
        try {
          const res = await api.get('user/getProfile.php');
          console.log(res.data);
        } catch(err: any) {
          
            console.error(err.message);
            setErrMsg(err.message);
            
          }finally {
            dispatch(uiActions.setIsLoading(false));
          }
          
      } 
      
      checkAuth();
  }, []);
  */
  console.log(errMsg);
  const text = 'Da li ste sigurni?';
    return (
      <>
      
      <ConfirmModal ref={dialog} text={text}  />
      
      <section>
      <h1>MENADŽERSKA TABLA</h1>
      {!errMsg ? <nav aria-label="Manage barber navigation">
        <UserNavigation />
        <ul>
          {barbers?.map((barber, index) => {
            //const barber: BarberType = {barberItem, index: index};
            return (
              <BarberItem  key={barber.id} {...barber} index={index}>
                <BarberButtons ref={dialog} barberId={barber.id?.toString()} />
              </BarberItem>
            )
          })}
        </ul>
      </nav> : <p className="textCenter">{errMsg}</p>}
      </section>
      </>  
    );
};
export default Home;