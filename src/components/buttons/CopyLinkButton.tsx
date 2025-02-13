import React, { useState } from "react";
import { Copy } from "lucide-react";

const CopyLinkButton: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 sec
  };

  return (
    <div className="copy-button-container">
      <button
        onClick={handleCopy}
        className={`copy-button ${isCopied ? "copied" : ""}`}
        aria-label="Copy Link"
      >
        <Copy className="copy-icon" />
      </button>

      {/* "Copied!" Tooltip */}
      {isCopied && <span className="copy-tooltip">Copied!</span>}
    </div>
  );
};

export default CopyLinkButton;
