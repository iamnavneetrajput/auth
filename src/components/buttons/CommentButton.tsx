import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

interface CommentButtonProps {

    comments: number;
  
  }

  const CommentButton: React.FC<CommentButtonProps> = ({ comments }) => {
  const [isCommented, setIsCommented] = useState(false);

  return (
    <button
      onClick={() => setIsCommented(!isCommented)}
      className="p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
      aria-label={isCommented ? "Remove Comment" : "Add Comment"}
    >
      <MessageCircle
        className={`w-8 h-8 transition-all duration-300 ease-out
          ${isCommented ? "fill-blue-500 stroke-blue-500 scale-110" : "stroke-gray-600 hover:stroke-blue-500"}
        `}
      />
       <span>{comments}</span>
    </button>
  );
};

export default CommentButton;
