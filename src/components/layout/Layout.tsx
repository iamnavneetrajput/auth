import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/reels';

  return (
    <>
      <div>
        {children}
      </div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
  