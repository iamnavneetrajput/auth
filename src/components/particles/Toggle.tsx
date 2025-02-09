import React from "react";

interface ThemeToggleProps {
  isNightMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isNightMode, onToggle }) => {
  return (
    <label htmlFor="themeToggle" className="themeToggle st-sunMoonThemeToggleBtn">
      <input
        type="checkbox"
        id="themeToggle"
        className="themeToggleInput"
        checked={isNightMode}
        onChange={onToggle}
      />
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <mask id="moon-mask">
          <rect x="0" y="0" width="20" height="20" fill="white" />
          <circle cx="11" cy="3" r="8" fill="black" />
        </mask>
        <circle className="sunMoon" cx="10" cy="10" r="8" mask="url(#moon-mask)" />
        <g>
          {[{ cx: 18, cy: 10 }, { cx: 14, cy: 16.928 }, { cx: 6, cy: 16.928 },
            { cx: 2, cy: 10 }, { cx: 6, cy: 3.1718 }, { cx: 14, cy: 3.1718 }].map((pos, index) => (
            <circle key={index} className={`sunRay sunRay${index + 1}`} {...pos} r="1.5" />
          ))}
        </g>
      </svg>
    </label>
  );
};

export default ThemeToggle;
