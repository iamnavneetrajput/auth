import { useState, useEffect } from 'react';

const useTheme = () => {
  const [isNightMode, setIsNightMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsNightMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Apply theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsNightMode(savedTheme === 'dark');
  }, []);

  return { isNightMode, toggleTheme };
};

export default useTheme;
