import { useState, useCallback } from "react";
import Phone from "../SvgIcons/Phone";
import Instagram from "../SvgIcons/Instagram";
import Facebook from "../SvgIcons/Facebook";
import Email from "../SvgIcons/Email";
import ArrowDown from "../SvgIcons/ArrowDown";
import ArrowUp from "../SvgIcons/ArrowUp";
import Link from "next/link";
import styles from './Aside.module.css';


const AsideContact: React.FC = () => {
    const [showIcons, setShowIcons] = useState<boolean>(false);
    const phone: string = process.env.NEXT_PUBLIC_BUSINESS_PHONE as string;
    const email: string = process.env.NEXT_PUBLIC_BUSINESS_EMAIL as string;
    const handleArrowChange = () => {
        setShowIcons((prev) => !prev);
    }
    const svgData = {
        fill: "#B8941F"
    }
    const callOrCopy = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
            const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
            if(!isMobile) {
                e.preventDefault();
                navigator.clipboard?.writeText(phone).then(() => {alert (`Broj je kopiran u clipboard: ${phone}`)}).
                catch(() => {alert (`Ootvorite broj manualno: ${phone}`)});
    
            }
        }, []);
    return (
        <div className={styles.contact}>
            <div className={styles.openIconsDiv}>
                <h3>Kontaktirajte nas</h3>
                <div className={styles.arrowDiv}>
                    <button onClick={handleArrowChange}>{!showIcons ?<ArrowDown {...svgData}/> : <ArrowUp {...svgData}/>}</button>
                </div>
            </div>
            <div className={`${styles.iconsWrappDiv} ${showIcons ? styles.showIcons : ''}`}>
                <div className={`${styles.iconsDiv}`}>
                    <Link href={`tel:${phone}`} onClick={callOrCopy}>
                        <div className={styles.phone}>
                            <Phone {...svgData} />
                            <p>Pozovi</p>
                        </div>
                    </Link>
                    <Link href="https://www.instagram.com/mjrocky1981/" target='_blank'><Instagram {...svgData} /></Link>
                    <Link href="https://www.facebook.com/milan.jovanovic.39545?locale=sr_RS" target='_blank'><Facebook {...svgData} /></Link>
                    <Link href={`mailto:${email}`}><Email {...svgData} /></Link>
                </div>
            </div>
        </div> 
    );
};
export default AsideContact;