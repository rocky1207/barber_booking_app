import Image from "next/image";
import logo from '@/assets/images/logo_croped.png';
import styles from './Logo.module.css';
const Logo: React.FC<{logoDiv: string, logoImage: string}> = ({logoDiv, logoImage}) => {
   
    return (
        <div className={`wrapp ${logoDiv}`}>
            <Image className={logoImage} src={logo} alt="Logo" priority/>
        </div>
    );
};
export default Logo;