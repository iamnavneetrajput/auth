import React, { useState } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {

    likes: number;
  
  }

const LikeButton: React.FC<LikeButtonProps> = ({ likes }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <button
      onClick={() => setIsLiked(!isLiked)}
      className="p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <Heart
        className={`w-8 h-8 transition-all duration-300 ease-out
          ${isLiked ? "fill-red-500 stroke-red-500 scale-110" : "stroke-gray-600 hover:stroke-red-500"}
        `}
      />
    </button>
  );
};

export default LikeButton;
