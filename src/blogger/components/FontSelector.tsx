import React from 'react';

interface FontSelectorProps {
  fontType: string;
  fontSize: string;
  fontTypes: string[];
  fontSizes: string[];
  handleFontTypeChange: (font: string) => void;
  handleFontSizeChange: (size: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({
  fontType,
  fontSize,
  fontTypes,
  fontSizes,
  handleFontTypeChange,
  handleFontSizeChange,
}) => {
  return (
    <div className="post-category">
      {/* Font Type Selector */}
      <select 
        value={fontType} 
        onChange={(e) => handleFontTypeChange(e.target.value)} 
        title="Font Type" 
        className="post-category-select"
      >
        {fontTypes.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>

      {/* Font Size Selector */}
      <select 
        value={fontSize} 
        onChange={(e) => handleFontSizeChange(e.target.value)} 
        title="Font Size" 
        className="post-category-select"
      >
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
