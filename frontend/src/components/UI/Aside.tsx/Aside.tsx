import Image from "next/image"; 
import logo from '@/assets/images/logo_croped.png';
import styles from './Aside.module.css';

const Aside: React.FC = () => {
    return (
        <aside className={`cardDashboard ${styles.asideContainer}`}>
        <div>
            <Image className="logo-1" src={logo} alt="Logo" priority />
        </div>
        </aside>
    );
};
export default Aside;