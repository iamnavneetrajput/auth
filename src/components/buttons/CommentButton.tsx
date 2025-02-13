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
      className={`comment-button ${isCommented ? "commented" : ""}`}
      aria-label={isCommented ? "Remove Comment" : "Add Comment"}
    >
      <MessageCircle className="comment-icon" />
      <span className="comment-count">{comments}</span>
    </button>
  );
};

export default CommentButton;
