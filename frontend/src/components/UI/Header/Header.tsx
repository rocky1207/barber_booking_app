'use client';
import { useState, useEffect } from 'react';
import Menu from '../SvgIcons/Menu';
import styles from './Header.module.css';


const Header:React.FC = () => {
  const [animate, setAnimate] = useState(false);

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
  return (
    <>
    <header className={`${styles.header} ${animate ? styles.animateLine : ''}`}>
      <div className={`glass-effect `}>
      <div className={`wrapp`}>
        <Menu {...svgData} />
      </div>
      </div>
    </header>
    </>
  );
};
export default Header;