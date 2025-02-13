import React from "react";

const defaultProfileImage = "https://farm9.staticflickr.com/8505/8441256181_4e98d8bff5_z_d.jpg";
import PostFooter from "./PostFooter";

interface BlogPostProps {
  author: string;
  profileImage?: string;
  date: string;
  timeAgo: string;
  title: string;
  tags: string[];
  blogImage?: string;
  likes: number;
  comments: number;
  readTime: number;
}

const BlogPost: React.FC<BlogPostProps> = ({
  author,
  profileImage = defaultProfileImage,
  date,
  timeAgo,
  title,
  tags,
  blogImage,
  likes,
  comments,
  readTime,
}) => {
  return (
    <div className="blog-post">
      {/* Header: Profile Image + Author Name */}
      <div className="post-header">
        <img className="profile-image" src={profileImage} alt={`${author}'s profile`} loading="lazy" />
        <div className="post-info">
          <h4>{author}</h4>
          <small>{date} ({timeAgo})</small>
        </div>
      </div>

      {/* Blog Post Image - Only Show if Image Exists */}
      {blogImage && (
        <div className="post-image">
          <img src={blogImage} alt="" loading="lazy" />
        </div>
      )}

      {/* Content: Title & Tags */}
      <div className="post-content">
        <h3>{title}</h3>
        <p className="tags">{tags.length > 0 ? `#${tags.join(" #")}` : ""}</p>
      </div>

      {/* Footer: Likes, Comments, Bookmark, Read Time */}
      <div className="post-footer">
        <PostFooter
          likes={likes}
          comments={comments}
          readTime={readTime}
          variant="preview"
        />
      </div>
    </div>
  );
};

export default BlogPost;
