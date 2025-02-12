import React, { useState } from "react";
import { Link } from "lucide-react";

const CopyLinkButton: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 sec
  };

  return (
    <button
      onClick={handleCopy}
      className="p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
      aria-label="Copy Link"
    >
      <Link
        className={`w-8 h-8 transition-all duration-300 ease-out
          ${isCopied ? "fill-purple-500 stroke-purple-500 scale-110" : "stroke-gray-600 hover:stroke-purple-500"}
        `}
      />
    </button>
  );
};

export default CopyLinkButton;
