import React, { useState } from "react";
import { Share } from "lucide-react";

const ShareButton: React.FC = () => {
  const [isShared, setIsShared] = useState(false);

  const handleShare = () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000); // Reset after 2 sec
  };

  return (
    <div className="share-button-container">
      <button
        onClick={handleShare}
        className={`share-button ${isShared ? "shared" : ""}`}
        aria-label="Share"
      >
        <Share className="share-icon" />
      </button>

      {/* "Shared!" Tooltip */}
      {isShared && <span className="share-tooltip">Shared!</span>}
    </div>
  );
};

export default ShareButton;
