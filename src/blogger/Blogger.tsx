import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiEye, FiSave, FiDelete } from 'react-icons/fi';
import Toolbar from './Toolbar';
import Notification from '../components/particles/Notification';
// import PreviewModal from './components/PreviewModal';

// Define available message types
type MessageType = 'success' | 'error';

const Blogger: React.FC = () => {
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('success');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  /** Show a notification message */
  const showMessage = (msg: string, type: MessageType = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  /** Save content to localStorage */
  const handleSave = () => {
    if (contentRef.current) {
      localStorage.setItem('editorContent', contentRef.current.innerHTML);
      showMessage('Content saved successfully!', 'success');
    }
  };

  /** Clear the editor */
  const handleClear = () => {
    if (contentRef.current) {
      contentRef.current.innerHTML = '';
      showMessage('Content cleared!', 'success');
    }
  };

  /** Load default values when the component mounts */
  useEffect(() => {
    if (titleRef.current) titleRef.current.innerText = 'Enter Your Title';
    if (contentRef.current) contentRef.current.innerHTML = 'Start writing your content here...';
  }, []);

  return (
    <div className="main-editor-page main">
    {/* Toolbar Section */}
    <Toolbar editorRef={contentRef} setCategory={setSelectedCategory} />
  
    {/* Editor Section */}
    <div className="editor-container">
      {/* Title Input */}
      <div ref={titleRef} className="editor-title" contentEditable></div>
  
      {/* Content Input */}
      <div ref={contentRef} className="editor-content" contentEditable></div>
  
      {/* Notification Message */}
      {message && (
        <div className="notification-container">
          <Notification message={message} type={messageType} clearMessage={() => setMessage(null)} />
        </div>
      )}
  
      {/* Action Buttons */}
      <div className="editor-actions">
        <button className="action-btn">
          <FiSend title="Publish" />
        </button>
        <button onClick={() => setPreviewMode(!previewMode)} className="action-btn">
          <FiEye title="Preview" />
        </button>
        <button onClick={handleSave} className="action-btn">
          <FiSave title="Save" />
        </button>
        <button onClick={handleClear} className="action-btn">
          <FiDelete title="Clear" />
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Blogger;
