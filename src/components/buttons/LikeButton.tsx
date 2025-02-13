import React, { useState } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  likes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ likes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setShowPlusOne(true);
      setTimeout(() => setShowPlusOne(false), 800); // Hide after animation
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="like-button-container">
      <button
        onClick={handleLike}
        className={`like-button ${isLiked ? "liked" : ""}`}
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        <Heart className="heart-icon" />
      </button>

      {/* +1 Animation */}
      {showPlusOne && <span className="plus-one">+1</span>}
    </div>
  );
};

export default LikeButton;
