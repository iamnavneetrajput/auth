import React, { useEffect, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '../../assets/icons/icon';

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
}

// List of emojis (moved outside to prevent unnecessary re-renders)
const EMOJIS = ['😀', '😂', '😍', '😎', '🤔', '😭', '😡', '👍', '👎', '👏', '🖕'];

const EmojiPicker: React.FC<EmojiPickerProps> = React.memo(({ onSelectEmoji, onClose }) => {
  const [closing, setClosing] = useState(false); // Controls fade-out animation

  // Handle keyboard events (Escape to close)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  /** Triggers fade-out before removing modal from DOM */
  const closeModal = () => {
    setClosing(true); // Start fade-out animation
    setTimeout(() => {
      onClose(); // Remove modal from DOM after animation ends
      setClosing(false); // Reset animation state
    }, 300); // Matches animation duration
  };

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${closing ? 'fade-out' : ''}`} onClick={closeModal}>
      <div className={`modal-container ${closing ? 'scale-out' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-modal" onClick={closeModal} aria-label="Close Emoji Picker">
          <CloseIcon />
        </button>

        {/* Emoji Selection */}
        <div className="emoji-picker">
          {EMOJIS.map((emoji, index) => (
            <button
              key={index}
              className="emoji-button"
              onClick={() => onSelectEmoji(emoji)}
              title={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
});

export default EmojiPicker;
