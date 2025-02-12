import React from 'react';
import SearchBar from '../particles/SearchBar';
import ThemeToggle from '../particles/Toggle';
import Sublink from '../particles/Sublink';
import useTheme from "../../utils/useTheme";

const Submenu: React.FC = () => {
  const { theme, setThemeMode } = useTheme();

  return (
    <div className="submenu">
      <ThemeToggle theme={theme} setThemeMode={setThemeMode} />
      <Sublink />
      <SearchBar />
    </div>
  );
};

export default Submenu;
