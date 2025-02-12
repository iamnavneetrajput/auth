import React, { useState } from 'react';
import FontSelector from './components/FontSelector';
import TextFormattingButtons from './components/TextFormattingButtons';
import { CiTextAlignCenter, CiTextAlignLeft, CiTextAlignRight } from 'react-icons/ci';
import ImageUploader from './components/ImageUploader';
import VideoUploader from './components/VideoUploader';
import LinkAdder from './components/LinkAdder';
import EmojiPicker from './components/EmojiPicker';
import { SmileIcon, BulletListIcon, NumberListIcon } from '../assets/icons/icon';
import CodeBlockAdder from './components/CodeBlockAdder';
import CategorySelector from './components/CategorySelector';

interface ToolbarProps {
  editorRef: React.RefObject<HTMLDivElement>;
  setCategory: (category: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editorRef, setCategory }) => {
  const [fontType, setFontType] = useState<string>('Arial');
  const [fontSize, setFontSize] = useState<string>('16px');
  const [urlInput, setUrlInput] = useState<string>('');
  const [linkName, setLinkName] = useState<string>('');
  const [isAlignMenuOpen, setIsAlignMenuOpen] = useState<boolean>(false);
  const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [currentAlignment, setCurrentAlignment] = useState<'left' | 'center' | 'right'>('left');

  /** Executes a text formatting command */
  const handleTextFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value || '');
  };

  /** Adds a code block inside the editor */
  const handleAddCodeBlock = (code: string) => {
    if (!editorRef.current) return;
    const codeHTML = `<pre><code>${code}</code></pre>`;
    editorRef.current.innerHTML += codeHTML;
  };

  /** Handles text alignment */
  const handleAlignment = (alignment: 'left' | 'center' | 'right') => {
    if (!editorRef.current) return;
    document.execCommand(`justify${alignment}`);
    setCurrentAlignment(alignment);
    setIsAlignMenuOpen(false);
  };

  /** Inserts an emoji inside the editor */
  const handleSelectEmoji = (emoji: string) => {
    if (!editorRef.current) return;
    editorRef.current.innerHTML += emoji;
    setIsEmojiMenuOpen(false);
  };

  return (
    <div className="toolbar">

      {/* Font Selection */}
      <FontSelector
        fontType={fontType}
        fontSize={fontSize}
        fontTypes={['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana']}
        fontSizes={['12px', '14px', '16px', '18px', '20px', '24px']}
        handleFontTypeChange={(font) => {
          setFontType(font);
          handleTextFormatting('fontName', font);
        }}
        handleFontSizeChange={(size) => {
          setFontSize(size);
          handleTextFormatting('fontSize', size.replace('px', ''));
        }}
      />

      {/* Text Formatting Buttons */}
      <TextFormattingButtons
        handleTextFormatting={handleTextFormatting}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      {/* Emoji Picker */}
      <div className="toolbar-item">
        <button onClick={() => setIsEmojiMenuOpen(!isEmojiMenuOpen)}>
          <SmileIcon />
        </button>
        {isEmojiMenuOpen && (
          <EmojiPicker onSelectEmoji={handleSelectEmoji} onClose={() => setIsEmojiMenuOpen(false)} />
        )}
      </div>

      {/* Category Selector */}
      <CategorySelector setCategory={setCategory} />

      {/* Text Alignment Controls */}
      <div className="alignment-menu">
        <button onClick={() => handleAlignment('left')}>
          <CiTextAlignLeft style={{ color: currentAlignment === 'left' ? 'blue' : 'inherit' }} />
        </button>
        <button onClick={() => handleAlignment('center')}>
          <CiTextAlignCenter style={{ color: currentAlignment === 'center' ? 'blue' : 'inherit' }} />
        </button>
        <button onClick={() => handleAlignment('right')}>
          <CiTextAlignRight style={{ color: currentAlignment === 'right' ? 'blue' : 'inherit' }} />
        </button>
      </div>

      {/* Bullet Points & Numbering */}
      <div className="toolbar-item">
        <button onClick={() => handleTextFormatting('insertUnorderedList')}>
          <BulletListIcon />
        </button>
        <button onClick={() => handleTextFormatting('insertOrderedList')}>
          <NumberListIcon />
        </button>
      </div>

      {/* Link Adder */}
      <LinkAdder
        handleAddLink={() => {
          if (!editorRef.current) return;
          const linkHTML = `<a href="${urlInput}" target="_blank">${linkName}</a>`;
          editorRef.current.innerHTML += linkHTML;
          setUrlInput('');
          setLinkName('');
        }}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
        linkName={linkName}
        setLinkName={setLinkName}
      />

      {/* Image Uploader */}
      <ImageUploader
        handleMediaUpload={(event) => {
          const file = event.target.files?.[0];
          if (!file || !editorRef.current) return;

          const fileURL = URL.createObjectURL(file);
          const mediaHTML = `<img src="${fileURL}" alt="Uploaded image"/>`;
          editorRef.current.innerHTML += mediaHTML;
        }}
        handleAddMedia={() => {
          if (!editorRef.current) return;
          const mediaHTML = `<img src="${urlInput}" alt="Inserted image"/>`;
          editorRef.current.innerHTML += mediaHTML;
          setUrlInput('');
        }}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
      />

      {/* Video Uploader */}
      <VideoUploader
        handleMediaUpload={(event) => {
          const file = event.target.files?.[0];
          if (!file || !editorRef.current) return;

          const fileURL = URL.createObjectURL(file);
          const mediaHTML = `<video controls><source src="${fileURL}" type="video/mp4"></video>`;
          editorRef.current.innerHTML += mediaHTML;
        }}
        handleAddMedia={() => {
          if (!editorRef.current) return;
          const mediaHTML = `<video controls><source src="${urlInput}" type="video/mp4"></video>`;
          editorRef.current.innerHTML += mediaHTML;
          setUrlInput('');
        }}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
      />

      {/* Code Block Adder */}
      <CodeBlockAdder handleAddCodeBlock={handleAddCodeBlock} />
    </div>
  );
};

export default Toolbar;
