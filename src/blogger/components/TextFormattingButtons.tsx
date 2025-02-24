import React, { useState, useEffect, useCallback } from 'react';
import { FiBold, FiItalic, FiUnderline } from 'react-icons/fi';
import { ImTextColor } from 'react-icons/im';
import { CloseIcon } from '../../assets/icons/icon';

interface TextFormattingButtonsProps {
  handleTextFormatting: (command: string, value?: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

// Predefined colors for content writing & highlighting
const PRESET_COLORS = ['#000000', '#FF0000', '#FFD700', '#FFFFFF', '#008000', '#0000FF'];

const TextFormattingButtons: React.FC<TextFormattingButtonsProps> = ({ handleTextFormatting, selectedColor, setSelectedColor }) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [closing, setClosing] = useState(false); // Controls fade-out animation

  const [activeFormats, setActiveFormats] = useState<{ bold: boolean; italic: boolean; underline: boolean }>({
    bold: false,
    italic: false,
    underline: false,
  });

  /** Updates the active format states based on user selection */
  const checkActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', checkActiveFormats);
    return () => document.removeEventListener('selectionchange', checkActiveFormats);
  }, [checkActiveFormats]);

  /** Handles formatting actions */
  const handleButtonClick = (command: 'bold' | 'italic' | 'underline' | 'foreColor', value?: string) => {
    handleTextFormatting(command, value);

    if (command === 'foreColor') {
      setSelectedColor(value || selectedColor);
      closeModal(); // Close modal after selecting a color
    } else {
      setActiveFormats((prev) => ({
        ...prev,
        [command]: !prev[command],
      }));
    }
  };

  /** Closes color picker on Escape key press */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
  }, []);

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showColorPicker, handleKeyDown]);

  /** Triggers fade-out before removing modal from DOM */
  const closeModal = () => {
    setClosing(true); // Start fade-out animation
    setTimeout(() => {
      setShowColorPicker(false); // Remove modal from DOM after animation ends
      setClosing(false); // Reset animation state
    }, 300); // Matches animation duration
  };

  return (
    <div className="text-format-buttons">
      {/* Bold, Italic, Underline Buttons */}
      {(['bold', 'italic', 'underline'] as const).map((format) => (
        <button
          key={format}
          className={`format-button ${activeFormats[format] ? 'active' : ''}`}
          onClick={() => handleButtonClick(format)}
        >
          {format === 'bold' ? <FiBold title="Bold" /> : format === 'italic' ? <FiItalic title="Italic" /> : <FiUnderline title="Underline" />}
        </button>
      ))}

      {/* Color Picker Button (Icon Changes Color Based on Selection) */}
      <button
        className={`color-button ${showColorPicker ? 'active' : ''}`}
        onClick={() => setShowColorPicker(true)}
        style={{ color: selectedColor }} // Change icon color dynamically
      >
        <ImTextColor title="Text Color" />
      </button>

      {/* Color Picker Modal with Fade & Scale Animation */}
      {showColorPicker && (
        <div className={`modal-overlay ${closing ? 'fade-out' : ''}`} onClick={closeModal}>
          <div className={`modal-container ${closing ? 'scale-out' : ''}`} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="close-modal" onClick={closeModal}>
              <CloseIcon />
            </button>

            {/* Predefined Color Selection */}
            <div className="color-picker-grid">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  className="color-option"
                  style={{ backgroundColor: color }}
                  onClick={() => handleButtonClick('foreColor', color)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextFormattingButtons;
