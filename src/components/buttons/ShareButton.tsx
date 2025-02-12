import React, { useState } from "react";
import { Share2 } from "lucide-react";

const ShareButton: React.FC = () => {
  const [isShared, setIsShared] = useState(false);

  return (
    <button
      onClick={() => setIsShared(!isShared)}
      className="p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
      aria-label="Share"
    >
      <Share2
        className={`w-8 h-8 transition-all duration-300 ease-out
          ${isShared ? "fill-green-500 stroke-green-500 scale-110" : "stroke-gray-600 hover:stroke-green-500"}
        `}
      />
    </button>
  );
};

export default ShareButton;
