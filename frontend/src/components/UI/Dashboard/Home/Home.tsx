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
  const {barbers, actionBarberId, loggedBarber} = useAppSelector((state: RootState) => state?.barber);
  console.log(barbers);
  console.log(loggedBarber);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
    
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
         role: '',
         suspended: 0
     }));
     setIsLoadingState(true, dispatch);
        router.push('/');
     };
  const updatedDeleteBarberBtn = {
    ...deleteBarberBtn,
    id: actionBarberId,
    head: 'Da li ste sigurni?',
    onAction: manageBarber
  }
  const hoursHandler = () => {
         dispatch(barberActions.setActionBarberId(loggedBarber?.id));

    router.push('/login/dashboard/working-hours');
  }
  
    return (
      <>
      <ConfirmModal ref={dialog} {...updatedDeleteBarberBtn}  />
      {loggedBarber.suspended !== 0 ? <p>Nemate više pristup aplikaciji</p> : <section>
        <nav>
          <ul className="flexed">
            <li><button onClick={logOutHandler}>LOG OUT</button></li>
            <li className=''><button onClick={hoursHandler}>RADNO VREME</button></li>
          </ul>
        </nav>
        
      <h1>MENADŽERSKA TABLA</h1>
      <UserNavigation />
      <nav aria-label="Manage barber navigation">
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
      </section>}
      </>  
    );
};
export default Home;