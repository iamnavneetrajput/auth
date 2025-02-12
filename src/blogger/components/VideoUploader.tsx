import React, { useState, useCallback, useEffect } from 'react';
import { VideoIcon, CloseIcon, AddIcon, Close } from '../../assets/icons/icon';
import Notification from '../../components/particles/Notification';

interface VideoUploaderProps {
  handleMediaUpload: (event: React.ChangeEvent<HTMLInputElement>, type: 'video') => void;
  handleAddMedia: (type: 'video') => void;
  urlInput: string;
  setUrlInput: (url: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ handleMediaUpload, handleAddMedia, urlInput, setUrlInput }) => {
  const [isVideoMenuOpen, setIsVideoMenuOpen] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  /** Triggers fade-out before removing modal */
  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setIsVideoMenuOpen(false);
      setClosing(false);
    }, 300);
  };

  /** Handles adding video */
  const handleVideoSubmit = () => {
    if (!urlInput.trim()) {
      setMessage('Please provide a valid video URL or upload a file.');
      setMessageType('error');
      return;
    }

    handleAddMedia('video');
    setMessage('Video added successfully!');
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
      <button className="modal-trigger-button" onClick={() => setIsVideoMenuOpen(true)} title="Add Video">
        <VideoIcon />
      </button>

      {isVideoMenuOpen && (
        <div className={`modal-overlay ${closing ? 'fade-out' : ''}`} onClick={closeModal}>
          <div className={`modal-container ${closing ? 'scale-out' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal} aria-label="Close">
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
              <button className="modal-button submit-button" onClick={handleVideoSubmit}>
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

export default VideoUploader;
