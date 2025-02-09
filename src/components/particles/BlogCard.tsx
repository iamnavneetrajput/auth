import React from "react";
// import "./BlogCard.css";

interface BlogCardProps {
  author: string;
  date: string;
  profileImg?: string;
  title: string;
  tags: string[];
  likes: number;
  comments: number;
  readTime: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  author,
  date,
  profileImg,
  title,
  tags,
  likes,
  comments,
  readTime,
}) => {
  return (
    <div className="blog-card">
      <div className="blog-header">
        <img
          src={profileImg || "https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png"}
          alt="Profile"
          className="profile-img"
        />
        <div className="blog-header-text">
          <h4>{author}</h4>
          <p className="blog-date">{date}</p>
        </div>
      </div>

      <div className="blog-image">
        <span className="image-placeholder">🖼️</span>
      </div>

      <div className="blog-content">
        <h3>{title}</h3>
        <p className="tags">{tags.map((tag) => `#${tag} `)}</p>

        <div className="blog-footer">
          <span>❤️ {likes}</span>
          <span>💬 {comments}</span>
          <span>🔖</span>
          <span>{readTime} read</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
