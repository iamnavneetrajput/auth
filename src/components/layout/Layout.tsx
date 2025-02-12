import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useScrollVisibility } from "../../hooks/useScrollVisibility";
import Submenu from "./Submenu";
import Navbar from "./Navbar"; 

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isVisible = useScrollVisibility();

  // Hide everything (Navbar, Submenu, Footer) only on `/reels`
  const hideAll = location.pathname === "/reels";

  // Hide only Submenu & Footer on `/write`
  const hideSubmenuAndFooter = location.pathname === "/write";

  // Hide Footer on `/post-reading` & `/write`
  const hideFooter = hideSubmenuAndFooter || location.pathname === "/post-reading";

  return (
    <>
      {!hideAll && <Navbar />}
      {!hideAll && !hideSubmenuAndFooter && (
        <div className={`submenu ${isVisible ? "visible" : "hidden"}`}>
          <Submenu />
        </div>
      )}
      <div>{children}</div>
      {!hideFooter && (
        <footer className={`footer ${isVisible ? "visible" : "hidden"}`}>
          <Footer />
        </footer>
      )}
    </>
  );
};

export default Layout;
