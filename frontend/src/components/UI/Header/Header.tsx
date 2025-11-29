'use client';
import { useState, useEffect } from 'react';
import Menu from '../SvgIcons/Menu';
import Close from '../SvgIcons/Close';
import Link from 'next/link';
import PageNavigation from '../PageNavigation/PageNavigation';
import { clientsHeaderNav } from '@/datas/NavigationObjects';
import styles from './Header.module.css';


const Header:React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [openHeader, setOpenHeader] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);
  const svgData = {
    width: '30px',
    height: '30px',
    fill: "#B8941F"
  }
  const handleClick = () => {
    setOpenHeader(!openHeader);
  }
  return (
    <>
    <header className={`${styles.header} ${animate ? styles.animateLine : ''}`}>
      <div className={`glass-effect ${styles.openMenuOverlay} ${openHeader ? styles.menuOverlay : ''}`}>
      <div className={`wrapp ${styles.btnWrappDiv}`}>
        <button onClick={handleClick} className={styles.menuBtn}>
        {!openHeader ? <Menu {...svgData} /> : <Close {...svgData} />}
        </button>
        {openHeader && <div className={styles.linkWrappDiv}> 
         {/* <Link href={'/appointments/client'}>PREGLED REZERVISANIH TERMINA</Link>*/}
         <PageNavigation {...clientsHeaderNav} />
      
        </div>}
      </div>
      </div>
    </header>
    </>
  );
};
export default Header;