"use client";
import {useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import UserNavigation from "../UserNavigation/UserNavigation";
import BarberItem from "@/components/UI/Barbers/BarberItem";
import BarberButtons from "@/components/UI/Barbers/BarberButtons";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { logOut } from "@/lib/api/user/logOut";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import { deleteBarberBtn } from '@/datas/ButttonObjects';
import { manageBarber } from "@/lib/api/user/manageBarber";
import { useRouter } from "next/navigation";
import { barberActions } from "@/store/slices/barberSlice";

const Home: React.FC = () => {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const {barbers, currentBarberId, loggedBarber} = useAppSelector((state: RootState) => state?.barber);
  console.log(barbers);
  console.log(loggedBarber);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
    
  console.log(currentBarberId);
  useEffect(() => {
    setIsLoadingState(false, dispatch);
  }, []);
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
 const logOutHandler = async () => {
         const result = await logOut('auth/logout.php', {});
         if(!result.success) {
             setErrorMessage(result.message);
         }
         dispatch(barberActions.setLoggedBarber({
         id: 0,
         username: '',
         file: '',
         role: ''
     }));
        router.push('/');
     };
  const updatedDeleteBarberBtn = {
    ...deleteBarberBtn,
    id: currentBarberId,
    head: 'Da li ste sigurni?',
    onAction: manageBarber
  }
  
    return (
      <>
      <ConfirmModal ref={dialog} {...updatedDeleteBarberBtn}  />
      <section>
        <div className='logOutDiv'><button onClick={logOutHandler}>LOG OUT</button></div>
      <h1>MENADŽERSKA TABLA</h1>
      <nav aria-label="Manage barber navigation">
        <UserNavigation />
        {errorMessage && <p>{errorMessage}</p>}
        <ul>
          {barbers?.map((barber, index) => {
            //const barber: BarberType = {barberItem, index: index};
            return (
              <BarberItem  key={barber.id} {...barber} index={index}>
                <BarberButtons ref={dialog} barberId={barber.id} />
              </BarberItem>
            )
          })}
        </ul>
      </nav>
      </section>
      </>  
    );
};
export default Home;