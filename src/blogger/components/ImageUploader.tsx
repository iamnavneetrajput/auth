import React, { useState, useCallback, useEffect } from 'react';
import { ImageIcon, CloseIcon, AddIcon, Close } from '../../assets/icons/icon';
import Notification from '../../components/particles/Notification';

interface ImageUploaderProps {
  handleMediaUpload: (event: React.ChangeEvent<HTMLInputElement>, type: 'img') => void;
  handleAddMedia: (type: 'img') => void;
  urlInput: string;
  setUrlInput: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ handleMediaUpload, handleAddMedia, urlInput, setUrlInput }) => {
  const [isImageMenuOpen, setIsImageMenuOpen] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  /** Triggers fade-out before removing modal */
  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setIsImageMenuOpen(false);
      setClosing(false);
    }, 300);
  };

  /** Handles adding image */
  const handleImageSubmit = () => {
    if (!urlInput.trim()) {
      setMessage('Please provide a valid image URL or upload a file.');
      setMessageType('error');
      return;
    }

    handleAddMedia('img');
    setMessage('Image added successfully!');
    setMessageType('success');
    closeModal();
  };

  /** Closes modal on Escape key */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="media-upload-section">
      <button className="modal-trigger-button" onClick={() => setIsImageMenuOpen(true)} title="Add Image">
        <ImageIcon />
      </button>

      {isImageMenuOpen && (
        <div className={`modal-overlay ${closing ? 'fade-out' : ''}`} onClick={closeModal}>
          <div className={`modal-container ${closing ? 'scale-out' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal} aria-label="Close">
              <CloseIcon />
            </button>

            <input className="modal-input" type="file" accept="image/*" onChange={(e) => handleMediaUpload(e, 'img')} />
            <input
              className="modal-input"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter image URL"
            />

            <div className="button-group">
              <button className="modal-button submit-button" onClick={handleImageSubmit}>
                <AddIcon />
              </button>
              <button className="modal-button cancel-button" onClick={closeModal}>
                <Close />
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

export default ImageUploader;
