import React, { useState } from "react";
import { Bookmark } from "lucide-react";

const BookmarkButton: React.FC = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <button
      onClick={() => setIsBookmarked(!isBookmarked)}
      className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
      aria-label={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
    >
      <Bookmark className="bookmark-icon" />
    </button>
  );
};

export default BookmarkButton;
