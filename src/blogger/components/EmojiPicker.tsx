import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '../../assets/icons/icon';

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
}

// List of emojis (moved outside to prevent unnecessary re-renders)
const EMOJIS = ['😀', '😂', '😍', '😎', '🤔', '😭', '😡', '👍', '👎', '👏', '🖕'];

const EmojiPicker: React.FC<EmojiPickerProps> = React.memo(({ onSelectEmoji, onClose }) => {
  // Handle keyboard events (Escape to close)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-modal" onClick={onClose} aria-label="Close Emoji Picker">
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
