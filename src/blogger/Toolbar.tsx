import React, { useState, useCallback } from 'react';
import FontSelector from './components/FontSelector';
import TextFormattingButtons from './components/TextFormattingButtons';
import { CiTextAlignCenter, CiTextAlignLeft, CiTextAlignRight } from 'react-icons/ci';
import MediaUploader from './components/MediaUploader';
import LinkAdder from './components/LinkAdder';
import EmojiPicker from './EmojiPicker';
import { SmileIcon, Bulletpoint, Numbering } from '../assets/icons/Icon';
import CodeBlockAdder from './components/CodeBlockAdder';
import CategorySelector from './components/CategorySelector';

const Toolbar = ({ editorRef, setCategory }) => {
    const [fontType, setFontType] = useState('Arial');
    const [fontSize, setFontSize] = useState('16px');
    const [urlInput, setUrlInput] = useState('');
    const [linkName, setLinkName] = useState('');
    const [isAlignMenuOpen, setIsAlignMenuOpen] = useState(false);
    const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [currentAlignment, setCurrentAlignment] = useState('left');

    const handleTextFormatting = useCallback((command, value) => {
        document.execCommand(command, false, value);
    }, []);

    const handleAddCodeBlock = useCallback((code) => {
        const codeHTML = `<pre><code>${code}</code></pre>`;
        editorRef.current.innerHTML += codeHTML;
    }, [editorRef]);

    const handleAlignment = useCallback((alignment) => {
        const alignmentValue = alignment.toLowerCase();
        if (editorRef.current) {
            document.execCommand('justify' + alignmentValue);
        }
        setCurrentAlignment(alignmentValue);
        setIsAlignMenuOpen(false);
    }, [editorRef]);

    const handleSelectEmoji = useCallback((emoji) => {
        editorRef.current.innerHTML += emoji;
        setIsEmojiMenuOpen(false);
    }, [editorRef]);

    const handleAddLink = useCallback(() => {
        const linkHTML = `<a href="${urlInput}">${linkName}</a>`;
        editorRef.current.innerHTML += linkHTML;
        setUrlInput('');
        setLinkName('');
    }, [urlInput, linkName, editorRef]);

    const handleMediaUpload = useCallback((event, type) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            const mediaHTML = `<${type} src="${fileURL}" />`;
            editorRef.current.innerHTML += mediaHTML;
        }
    }, [editorRef]);

    const handleAddMedia = useCallback((type) => {
        const mediaHTML = `<${type} src="${urlInput}" />`;
        editorRef.current.innerHTML += mediaHTML;
        setUrlInput('');
    }, [urlInput, editorRef]);

    return (
        <div className="toolbar">
            <FontSelector
                fontType={fontType}
                fontSize={fontSize}
                fontTypes={['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana']}
                fontSizes={['2px', '4px', '6px', '8px', '10px', '12px']}
                handleFontTypeChange={(font) => {
                    setFontType(font);
                    handleTextFormatting('fontName', font);
                }}
                handleFontSizeChange={(size) => {
                    setFontSize(size);
                    handleTextFormatting('fontSize', size.replace('px', ''));
                }}
            />

            <TextFormattingButtons
                handleTextFormatting={handleTextFormatting}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
            />

            <div className="toolbar-item">
                <button onClick={() => setIsEmojiMenuOpen(!isEmojiMenuOpen)}>
                    <SmileIcon title="Emoji" />
                </button>
                {isEmojiMenuOpen && (
                    <EmojiPicker
                        onSelectEmoji={handleSelectEmoji}
                        onClose={() => setIsEmojiMenuOpen(false)}
                    />
                )}
            </div>

            <CategorySelector setCategory={setCategory} />

            <div className="alignment-menu">
                {['Left', 'Center', 'Right'].map((align) => (
                    <button key={align} onClick={() => handleAlignment(align)}>
                        {React.createElement(
                            align === 'Left' ? CiTextAlignLeft :
                            align === 'Center' ? CiTextAlignCenter :
                            CiTextAlignRight,
                            { style: { color: currentAlignment === align.toLowerCase() ? 'blue' : 'inherit' } }
                        )}
                    </button>
                ))}
            </div>

            <div className="toolbar-item">
                <button onClick={() => handleTextFormatting('insertUnorderedList')}>
                    <Bulletpoint />
                </button>
                <button onClick={() => handleTextFormatting('insertOrderedList')}>
                    <Numbering />
                </button>
            </div>

            <LinkAdder
                handleAddLink={handleAddLink}
                urlInput={urlInput}
                setUrlInput={setUrlInput}
                linkName={linkName}
                setLinkName={setLinkName}
            />

            <MediaUploader
                handleMediaUpload={handleMediaUpload}
                handleAddMedia={handleAddMedia}
                urlInput={urlInput}
                setUrlInput={setUrlInput}
            />

            <CodeBlockAdder handleAddCodeBlock={handleAddCodeBlock} />
        </div>
    );
};

export default Toolbar;
