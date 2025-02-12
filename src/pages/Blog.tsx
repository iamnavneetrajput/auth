import React from "react";
import BlogPost from "../components/particles/BlogPost";

const recentPosts = [
  {
    author: "Navneet Singh",
    profileImage: "https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png",
    date: "Feb 3",
    timeAgo: "3 days ago",
    title: "This is the title of the blog that design same as shown in the image and make responsive",
    tags: ["webdev", "Programming", "ai"],
    blogImage: '',
    likes: 120,
    comments: 22,
    readTime: "2 min",
  },
  {
    author: "Abhinit Singh",
    profileImage: "https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png",
    date: "Feb 2",
    timeAgo: "4 days ago",
    title: "This is the title of the blog that design same as shown in the image and make responsive",
    tags: ["webdev", "Programming", "ai&ml"],
    blogImage: "",
    likes: 120,
    comments: 25,
    readTime: "3 min",
  },
];

const RecentPosts: React.FC = () => {
  return (
    <div className="main">
      {recentPosts.map((post, index) => (
        <BlogPost key={index} {...post} />
      ))}
    </div>
  );
};

export default RecentPosts;
