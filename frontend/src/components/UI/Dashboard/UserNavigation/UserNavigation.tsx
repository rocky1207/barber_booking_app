"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { logOut } from "@/lib/api/user/logOut";
import styles from './UserNavigation.module.css';
const UserNavigation: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const {loggedBarber} = useAppSelector((state: RootState) => state?.barber);
    const logOutHandler = async () => {
        const result = await logOut('auth/logout.php', {});
        if(!result.success) {
            setErrorMessage(result.message);
        }
       router.push('/');
    };
    let showLink = false;
    if(loggedBarber.role === 'admin' ||  loggedBarber.role === 'owner') showLink = true;
    return (
        <>
            {errorMessage && <p>{errorMessage}</p>}
            <ul className={styles.userNavigation}>
            <li><button onClick={logOutHandler}>LOG OUT</button></li>
            {showLink && <li><Link href="/login/dashboard/register">NOVI KORISNIK</Link></li>}
            </ul>
        </>
    );
};
export default UserNavigation;