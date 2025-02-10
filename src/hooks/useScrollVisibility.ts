import { useState, useEffect, useRef } from "react";

export const useScrollVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const scrollPos = useRef(window.scrollY);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < scrollPos.current;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setIsVisible(isScrollingUp || currentScrollPos < 50);
          scrollPos.current = currentScrollPos;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isVisible;
};
