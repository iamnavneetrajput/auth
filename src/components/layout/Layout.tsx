import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useScrollVisibility } from "../../hooks/useScrollVisibility";
import Submenu from "./Submenu";
import Navbar from "./Navbar"; // Import Navbar
import useTheme from "../../utils/useTheme"; // Import theme toggle hook

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isVisible = useScrollVisibility();
  const { isNightMode, toggleTheme } = useTheme();

  // Hide everything (Navbar, Submenu, Footer) only on `/reels`
  const hideAll = location.pathname === "/reels";

  // Hide only Submenu & Footer on `/write`
  const hideSubmenuAndFooter = location.pathname === "/write";

  // Hide Footer on `/post-reading` & `/write`
  const hideFooter = hideSubmenuAndFooter || location.pathname === "/post-reading";

  return (
    <>
      {/* Navbar is visible unless on `/reels` */}
      {!hideAll && <Navbar />}

      {/* Submenu is hidden only on `/write` and `/reels` */}
      {!hideAll && !hideSubmenuAndFooter && (
        <div className={`submenu ${isVisible ? "visible" : "hidden"}`}>
          <Submenu isNightMode={isNightMode} onToggle={toggleTheme} />
        </div>
      )}

      {/* Page Content */}
      <div>{children}</div>

      {/* Footer is hidden on `/write`, `/reels`, and `/post-reading` */}
      {!hideFooter && (
        <footer className={`footer ${isVisible ? "visible" : "hidden"}`}>
          <Footer />
        </footer>
      )}
    </>
  );
};

export default Layout;
