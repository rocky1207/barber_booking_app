'use client';
import { useState, useEffect, ReactNode } from 'react';
import Image from "next/image";
import logo from '@/assets/images/logo_croped.png';
import Spinner from '../LoadingOverlay/Spinner';
import styles from './Header.module.css';

const DesktopHeader: React.FC<{children: ReactNode}> = ({/*...navigation*/children}) => {
  console.log(children);
  
  return (
    <div className={`${styles.headerDesktop} ${styles.menuOverlay}`}>
      <div className={`flexed ${styles.container}`}>
        <Spinner />
        <Image className="logo-1" src={logo} alt="Logo" priority />
        <div className='flexed'>
          {children}
        </div>
      </div>
    </div>
  );
};
export default DesktopHeader;