"use client";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";

import styles from './UserNavigation.module.css';
const UserNavigation: React.FC = () => {
    
    const {loggedBarber} = useAppSelector((state: RootState) => state?.barber);
    
    let showLink = false;
    if(loggedBarber.role === 'admin' ||  loggedBarber.role === 'owner') showLink = true;
    return (
        <>
            
            <ul className={styles.userNavigation}>
            {showLink && <li><Link href="/">HOME</Link></li>}
            {showLink && <li><Link href="/login/dashboard/user/register">NOVI KORISNIK</Link></li>}
            
            </ul>
        </>
    );
};
export default UserNavigation;