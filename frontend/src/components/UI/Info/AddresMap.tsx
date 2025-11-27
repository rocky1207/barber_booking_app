import Link from "next/link";
import Pin from "@/components/UI/SvgIcons/Pin";
import styles from './Info.module.css';

const AddressMap: React.FC = () => {
     const address = 'https://www.google.com/maps/dir/43.3225728,21.905408/%D0%82%D0%B5%D1%80%D0%B4%D0%B0%D0%BF%D1%81%D0%BA%D0%B0+44,+%D0%9D%D0%B8%D1%88+18000/@43.3219012,21.8970941,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x4755b0f299c88dcd:0x746b70cce7cc994c!2m2!1d21.9308796!2d43.3190487?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D';
    const svgData = {
        width: "16", 
        height: "16", 
        fill: "#B8941F"
    }
    return (
        <div className={styles.addressMapDiv}>
            <Link href={address} target="_blank">
            <div className={styles.infoFlex}>
            <Pin {...svgData} />
            <div className={styles.addressHolderDiv}>
                <span>Đerdapska 44</span>
                <span>18000 Niš</span></div>
            </div>
            </Link>
        </div>
    );
};
export default AddressMap;