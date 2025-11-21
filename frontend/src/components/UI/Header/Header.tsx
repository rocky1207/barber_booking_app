'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import logo from '@/assets/images/logo.png';

const Header:React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <header className={`${styles.header} ${animate ? styles.animateLine : ''}`}>
      <div>
        <Image className={styles.logo} src={logo} alt="Logo" priority/>
      </div>
    </header>
  );
};
export default Header;