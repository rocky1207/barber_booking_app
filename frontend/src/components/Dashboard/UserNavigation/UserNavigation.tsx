"use client";
import Link from "next/link";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import styles from './UserNavigation.module.css';
const UserNavigation: React.FC = () => {
    const router = useRouter();
    const logOutHandler = async () => {
            try {
                const res = await api.post('auth/logout.php', {});
                console.log(res);
                if((res).data.status === 200) {
                    router.push('/');
                }
            } catch(error) {
                console.log(error);
            }
        };
    return (
    <ul className={styles.userNavigation}>
      <li><button onClick={logOutHandler}>LOG OUT</button></li>
      <li><Link href="/login/register">NOVI KORISNIK</Link></li>
    </ul>
    
    );
};
export default UserNavigation;