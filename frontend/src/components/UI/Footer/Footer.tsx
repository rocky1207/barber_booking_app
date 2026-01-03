"use client";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { dashboardBtn } from "@/datas/ButttonObjects";
import NavigateButton from "@/components/Button/NavigateButton";
import Instagram from '../SvgIcons/Instagram';
import Facebook from '../SvgIcons/Facebook';
import Phone from '../SvgIcons/Phone';
import Email from '../SvgIcons/Email';
import Link from "next/link";

import styles from './Footer.module.css';

const Footer:React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
  
    const handleClick = () => {
        setIsLoadingState(true, dispatch);
        router.push('/login/dashboard');
    }
    const newDashboardBtn = {
        ...dashboardBtn,
        onAction: handleClick
    }
    const svgData = {
        fill: "#B8941F"
    }
    const phone: string = process.env.NEXT_PUBLIC_BUSINESS_PHONE as string;
    const email: string = process.env.NEXT_PUBLIC_BUSINESS_EMAIL as string;

    const callOrCopy = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
        if(!isMobile) {
            e.preventDefault();
            navigator.clipboard?.writeText(phone).then(() => {alert (`Broj je kopiran u clipboard: ${phone}`)}).
            catch(() => {alert (`Ootvorite broj manualno: ${phone}`)});

        }
    }, []);
    
    return (
        <footer className={`${styles.footer}`}>
            <div className='wrapp'>
                <div className={styles.socialMedia}>
                    <h3>Društvene mreže</h3>
                    <div className={styles.socialMediaIcons}>
                        <Link href="https://www.instagram.com/mjrocky1981/" target='_blank'><Instagram {...svgData} /></Link>
                        <Link href="https://www.facebook.com/milan.jovanovic.39545?locale=sr_RS" target='_blank'><Facebook {...svgData} /></Link>
                    </div>
                </div>
                <div className={styles.contact}>
                    <h3>Kontakt</h3>
                    <dl>
                        <dt className={styles.socialMediaIcons}><Phone {...svgData} /></dt>
                        <dd>
                            <Link href={`tel:${phone}`} onClick={callOrCopy} className={styles.contactLink}>
                                0642443190
                            </Link>
                        </dd>
                        <dt className={styles.socialMediaIcons}><Email {...svgData} /></dt>
                        <dd>
                            <Link href={`mailto:${email}`} className={styles.contactLink}>
                                djordjeakademija@gmail.com
                            </Link>
                        </dd>
                    </dl>
                </div>
                <div  className={styles.dashboard}>
                    <NavigateButton {...newDashboardBtn} />
                </div>
            </div>
        </footer>
    );
};
export default Footer;