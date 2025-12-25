'use client';
import { ReactNode } from 'react';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';




const Header:React.FC<{children: ReactNode}> = ({/*...navigation*/children}) => {
  
  return (
    <>
    <header>
      <MobileHeader>
        {children}
      </MobileHeader>
      <DesktopHeader>
        {children}
      </DesktopHeader>
    </header>
    </>
  );
};
export default Header;