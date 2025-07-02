"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { logOut } from "@/lib/api/logOut";
import styles from './UserNavigation.module.css';
const UserNavigation: React.FC = () => {
    const router = useRouter();
    const {loggedBarber} = useAppSelector((state: RootState) => state?.barber);
    const logOutHandler = async () => {
        const result = await logOut('auth/logout.php', {});
        if(!result.success) {
            console.log(result.message);
        }
        router.push('/');
    };
    return (
    <ul className={styles.userNavigation}>
      <li><button onClick={logOutHandler}>LOG OUT</button></li>
      {loggedBarber.role !== 'student' && <li><Link href="/login/dashboard/register">NOVI KORISNIK</Link></li>}
    </ul>
    
    );
};
export default UserNavigation;