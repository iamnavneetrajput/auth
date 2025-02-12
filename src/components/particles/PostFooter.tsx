import React from "react";
import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";
import BookmarkButton from "../buttons/BookmarkButton";
import ShareButton from "../buttons/ShareButton";
import CopyLinkButton from "../buttons/CopyLinkButton";

interface PostFooterProps {
  likes: number;
  comments: number;
  readTime: string;
  variant?: "preview" | "detailed"; // Defines layout type
}

const PostFooter: React.FC<PostFooterProps> = ({ likes, comments, readTime, variant = "preview" }) => {
  return (
    <div className={`post-footer flex items-center space-x-4 mt-4 ${variant === "detailed" ? "justify-between" : ""}`}>
      <LikeButton likes={likes} />
      <CommentButton comments={comments} />
      <BookmarkButton />
      
      {/* Extra icons for "detailed" layout */}
      {variant === "detailed" && (
        <>
          <ShareButton />
          <CopyLinkButton />
        </>
      )}

      <span>{readTime} read</span>
    </div>
  );
};

export default PostFooter;
