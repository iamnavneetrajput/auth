import React from "react";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark" | "system";
  setThemeMode: (mode: "light" | "dark" | "system") => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setThemeMode }) => {
  // Function to get the next theme in cycle: Light → System → Dark
  const getNextTheme = () => {
    return theme === "light" ? "system" : theme === "system" ? "dark" : "light";
  };

  return (
    <button
      onClick={() => setThemeMode(getNextTheme())}
      className="toggleButton"
      aria-label="Toggle theme"
    >
      <div className="iconContainer">
        <span className={`iconWrapper sunIcon ${theme === "light" ? "themevisible" : "themehidden"}`}>
          <Sun className="icon" />
        </span>
        <span className={`iconWrapper systemIcon ${theme === "system" ? "themevisible" : "themehidden"}`}>
          <MonitorSmartphone className="icon" />
        </span>
        <span className={`iconWrapper moonIcon ${theme === "dark" ? "themevisible" : "themehidden"}`}>
          <Moon className="icon" />
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
