"use client";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import styles from './UserNavigation.module.css';

const UserNavigation: React.FC = () => {
    const {loggedBarber} = useAppSelector((state: RootState) => state?.barber);
    const router = useRouter();
    const dispatch = useAppDispatch();
    let showLink = false;
    if(loggedBarber.role === 'admin' ||  loggedBarber.role === 'owner') showLink = true;
    const handleClick = () => {
        setIsLoadingState(true, dispatch);
        router.push('/');
    }
    return (
        <nav>
        <ul className={styles.userNavigation}>
            <li><button onClick={handleClick}>POČETNA</button></li>
            {showLink && <li><Link href="/login/dashboard/user/register">NOVI KORISNIK</Link></li>}
        </ul>
        </nav>
    );
};
export default UserNavigation;