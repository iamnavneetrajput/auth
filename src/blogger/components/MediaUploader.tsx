import React, { useState, useCallback, useEffect } from 'react';
import { ImageIcon, VideoIcon, CloseIcon, AddIcon, Close } from '../../assets/icons/icon';
import Notification from '../../components/particles/Notification';

interface MediaUploaderProps {
  handleMediaUpload: (event: React.ChangeEvent<HTMLInputElement>, type: 'img' | 'video') => void;
  handleAddMedia: (type: 'img' | 'video') => void;
  urlInput: string;
  setUrlInput: (url: string) => void;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ handleMediaUpload, handleAddMedia, urlInput, setUrlInput }) => {
  const [isImageMenuOpen, setIsImageMenuOpen] = useState<boolean>(false);
  const [isVideoMenuOpen, setIsVideoMenuOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  /** Closes all modals */
  const closeModals = () => {
    setIsImageMenuOpen(false);
    setIsVideoMenuOpen(false);
  };

  /** Handles adding media (image or video) */
  const handleMediaSubmit = (type: 'img' | 'video') => {
    if (!urlInput.trim()) {
      setMessage(`Please provide a valid ${type === 'img' ? 'image' : 'video'} URL or upload a file.`);
      setMessageType('error');
      return;
    }

    handleAddMedia(type);
    setMessage(`${type === 'img' ? 'Image' : 'Video'} added successfully!`);
    setMessageType('success');
    closeModals();
  };

  /** Closes modals when pressing Escape */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModals();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="toolbar-media">
      {/* Image Upload */}
      <div className="media-upload-section">
        <button className="modal-trigger-button" onClick={() => setIsImageMenuOpen(true)} title="Add Image">
          <ImageIcon />
        </button>

        {isImageMenuOpen && (
          <div className="modal-overlay" onClick={closeModals}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={closeModals} aria-label="Close">
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
                <button className="modal-button submit-button" onClick={() => handleMediaSubmit('img')}>
                  <AddIcon />
                </button>
                <button className="modal-button cancel-button" onClick={closeModals}>
                  <Close />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Upload */}
      <div className="media-upload-section">
        <button className="modal-trigger-button" onClick={() => setIsVideoMenuOpen(true)} title="Add Video">
          <VideoIcon />
        </button>

        {isVideoMenuOpen && (
          <div className="modal-overlay" onClick={closeModals}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={closeModals} aria-label="Close">
                <CloseIcon />
              </button>

              <input className="modal-input" type="file" accept="video/*" onChange={(e) => handleMediaUpload(e, 'video')} />
              <input
                className="modal-input"
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter video URL"
              />

              <div className="button-group">
                <button className="modal-button submit-button" onClick={() => handleMediaSubmit('video')}>
                  <AddIcon />
                </button>
                <button className="modal-button cancel-button" onClick={closeModals}>
                  <Close />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification */}
      {message && messageType && <Notification message={message} type={messageType} clearMessage={() => setMessage(null)} />}
    </div>
  );
};

export default MediaUploader;
