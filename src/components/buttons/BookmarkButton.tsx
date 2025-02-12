import React, { useState } from "react";
import { Bookmark } from "lucide-react";

const BookmarkButton: React.FC = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <button
      onClick={() => setIsBookmarked(!isBookmarked)}
      className="p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
      aria-label={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
    >
      <Bookmark
        className={`w-8 h-8 transition-all duration-300 ease-out
          ${isBookmarked ? "fill-yellow-500 stroke-yellow-500 scale-110" : "stroke-gray-600 hover:stroke-yellow-500"}
        `}
      />
    </button>
  );
};

export default BookmarkButton;
