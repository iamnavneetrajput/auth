import { useState, useEffect } from "react";

type ThemeType = "light" | "dark" | "system";

const useTheme = () => {
  // Get initial theme from localStorage or system default
  const getInitialTheme = (): ThemeType => {
    const savedTheme = localStorage.getItem("theme") as ThemeType | null;
    if (savedTheme) return savedTheme;
    return "system"; // Default to system theme
  };

  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);

  useEffect(() => {
    const applyTheme = (selectedTheme: ThemeType) => {
      if (selectedTheme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
      } else {
        document.documentElement.setAttribute("data-theme", selectedTheme);
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    // Listen for system theme changes
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        document.documentElement.setAttribute("data-theme", mediaQuery.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const setThemeMode = (mode: ThemeType) => setTheme(mode);

  return { theme, setThemeMode };
};

export default useTheme;
