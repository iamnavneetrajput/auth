import React, { useState, useCallback, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript'; // Import JavaScript syntax highlighting
import { CodeIcon, CloseIcon, AddIcon, Close } from '../../assets/icons/icon';
import Notification from '../../components/particles/Notification';

interface CodeBlockAdderProps {
  handleAddCodeBlock: (code: string) => void;
}

const CodeBlockAdder: React.FC<CodeBlockAdderProps> = ({ handleAddCodeBlock }) => {
  const [isCodeMenuOpen, setIsCodeMenuOpen] = useState<boolean>(false);
  const [codeInput, setCodeInput] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  /** Closes the modal when the Escape key is pressed */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCodeMenuOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isCodeMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCodeMenuOpen, handleKeyDown]);

  /** Adds a highlighted code block to the editor */
  const addCodeBlock = () => {
    if (!codeInput.trim()) {
      setMessage('Please enter some code.');
      setMessageType('error');
      return;
    }

    const highlightedCode = Prism.highlight(codeInput, Prism.languages.javascript, 'javascript');
    handleAddCodeBlock(`<pre><code class="language-javascript">${highlightedCode}</code></pre>`);
    
    setMessage('Code block added successfully!');
    setMessageType('success');
    setCodeInput('');
    setIsCodeMenuOpen(false);
  };

  return (
    <div className="code-block-adder">
      <button onClick={() => setIsCodeMenuOpen(true)}>
        <CodeIcon />
      </button>

      {isCodeMenuOpen && (
        <div className="modal-overlay" onClick={() => setIsCodeMenuOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="close-modal" onClick={() => setIsCodeMenuOpen(false)} aria-label="Close">
              <CloseIcon />
            </button>

            {/* Code Input */}
            <textarea
              className="modal-input"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Enter your code here..."
              style={{
                minHeight: '300px',
                padding: '10px',
                marginTop: '20px',
                backgroundColor: 'var(--background)',
                borderRadius: '5px',
              }}
            />

            {/* Action Buttons */}
            <div className="button-group">
              <button className="modal-button submit-button" onClick={addCodeBlock} disabled={!codeInput.trim()}>
                <AddIcon />
              </button>
              <button className="modal-button cancel-button" onClick={() => setIsCodeMenuOpen(false)}>
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

export default CodeBlockAdder;
