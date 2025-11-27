import Image from "next/image";
import logo from '@/assets/images/logo_croped.png';
import styles from './Logo.module.css';
const Logo: React.FC = () => {
    return (
        <div className={`wrapp ${styles.logoDiv}`}>
            <Image className={styles.logo} src={logo} alt="Logo" priority/>
        </div>
    );
};
export default Logo;