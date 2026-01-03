import Image from "next/image"; 
import logo from '@/assets/images/logo_croped.png';
import Info from "../Info/Info";
import AddressMap from "../LocationMap/AddressMap";
import AsideContact from "./AsideContact";
import styles from './Aside.module.css';

const Aside: React.FC = () => {
    const svgData = {
        fill: "#B8941F"
    }
    return (
        <aside className={`cardDashboard ${styles.asideContainer}`}>
            <div className={styles.asideLogoDiv}>
                <Image src={logo} alt="Logo" priority />
            </div>
            <h2>AKADEMIJA ĐORĐE</h2>
            <section className={styles.section}>
                <Info />
            </section>
            <AddressMap />
            <AsideContact />
        </aside>
    );
};
export default Aside;