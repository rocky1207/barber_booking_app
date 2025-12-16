"use client";
import { SetStateAction } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { logOut } from "@/lib/api/user/logOut";
import { barberActions } from "@/store/slices/barberSlice";
import styles from '@/components/UI/ClientNavigation/ClientNavigation.module.css';

const UserNavigation: React.FC<{setErrorMessage: React.Dispatch<SetStateAction<string>>}> = ({setErrorMessage}) => {
    const {loggedBarber} = useAppSelector((state: RootState) => state?.barber);
    const router = useRouter();
    const dispatch = useAppDispatch();
    let showLink = false;
    if(loggedBarber.role === 'admin' ||  loggedBarber.role === 'owner') showLink = true;
    const handleClick = () => {
        setIsLoadingState(true, dispatch);
        router.push('/');
    }
    const logOutHandler = async () => {
        const result = await logOut('auth/logout.php', {});
        if(!result.success) {
            setErrorMessage(result.message);
            return;
        }
        dispatch(barberActions.setLoggedBarber({
          id: 0,
          full_name: '',
          username: '',
          file: '',
          role: '',
          suspended: 0
      }));
      setIsLoadingState(true, dispatch);
        router.push('/');
      };
     const hoursHandler = () => {
      dispatch(barberActions.setActionBarberId(loggedBarber?.id));
      router.push('/login/dashboard/working-hours');
    }
    const handleTwoClick = () => {
      router.push('/login/dashboard/user/register');
    }
    return (
        <nav className={styles.clientHeaderNav}>
        <ul className={styles.userNavigation}>
            <li className={styles.clientHeaderLi}><button onClick={handleClick}>POČETNA</button></li>
            {showLink && <li className={styles.clientHeaderLi}><button onClick={handleTwoClick}>NOVI KORISNIK</button></li>}
            <li className={styles.clientHeaderLi}><button onClick={hoursHandler}>RADNO VREME</button></li>
            <li className={styles.separateLi}><button onClick={logOutHandler}>LOG OUT</button></li>
        </ul>
        </nav>
    );
};
export default UserNavigation;