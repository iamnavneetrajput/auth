import React, { useState, useCallback, useEffect } from 'react';
import { LinkIcon } from '../../assets/icons/icon';
import Notification from '../../components/particles/Notification';
import { Close, AddIcon } from '../../assets/icons/icon';

interface LinkAdderProps {
  handleAddLink: () => void;
  urlInput: string;
  setUrlInput: (url: string) => void;
  linkName: string;
  setLinkName: (name: string) => void;
}

const LinkAdder: React.FC<LinkAdderProps> = ({ handleAddLink, urlInput, setUrlInput, linkName, setLinkName }) => {
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  /** Handles adding a new link */
  const handleLinkSubmit = () => {
    if (!urlInput.trim() || !linkName.trim()) {
      setMessage('Please provide a valid URL and link name.');
      setMessageType('error');
      return;
    }

    handleAddLink();
    setMessage('Link added successfully!');
    setMessageType('success');
    setIsLinkMenuOpen(false);
  };

  /** Handles closing modal with Escape key */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLinkMenuOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isLinkMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLinkMenuOpen, handleKeyDown]);

  return (
    <div>
      {/* Trigger Button */}
      <button className="modal-trigger-button" onClick={() => setIsLinkMenuOpen(true)}>
        <LinkIcon />
      </button>

      {/* Modal */}
      {isLinkMenuOpen && (
        <div className="modal-overlay" onClick={() => setIsLinkMenuOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="close-modal" onClick={() => setIsLinkMenuOpen(false)} aria-label="Close">
              X
            </button>

            {/* URL Input */}
            <input
              className="modal-input"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter URL"
            />

            {/* Link Name Input */}
            <input
              className="modal-input"
              type="text"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              placeholder="Link name"
            />

            {/* Buttons */}
            <div className="button-group">
              <button className="modal-button submit-button" onClick={handleLinkSubmit} disabled={!urlInput.trim() || !linkName.trim()}>
                <AddIcon/>
              </button>
              <button className="modal-button cancel-button" onClick={() => setIsLinkMenuOpen(false)}>
              <Close/>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {message && messageType && <Notification message={message} type={messageType} clearMessage={() => setMessage(null)} />}
    </div>
  );
};

export default LinkAdder;
