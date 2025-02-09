import React from 'react';
import SearchBar from '../particles/SearchBar';
import ThemeToggle from '../particles/Toggle';
import Sublink from '../particles/Sublink';

interface SubmenuProps {
  isNightMode: boolean;
  onToggle: () => void;
}

const Submenu: React.FC<SubmenuProps> = ({ isNightMode, onToggle }) => {
  return (
    <div className="submenu">
      <ThemeToggle isNightMode={isNightMode} onToggle={onToggle} />
      <Sublink />
      <SearchBar />
    </div>
  );
};

export default Submenu;
