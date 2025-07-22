"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { barberActions } from "@/store/slices/barberSlice";
import { RootState } from "@/store/store";
import { logOut } from "@/lib/api/user/logOut";
import styles from './UserNavigation.module.css';
const UserNavigation: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {loggedBarber} = useAppSelector((state: RootState) => state?.barber);
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
    let showLink = false;
    if(loggedBarber.role === 'admin' ||  loggedBarber.role === 'owner') showLink = true;
    return (
        <>
            {errorMessage && <p>{errorMessage}</p>}
            <ul className={styles.userNavigation}>
            <li><button onClick={logOutHandler}>LOG OUT</button></li>
            {showLink && <li><Link href="/login/dashboard/user/register">NOVI KORISNIK</Link></li>}
            </ul>
        </>
    );
};
export default UserNavigation;