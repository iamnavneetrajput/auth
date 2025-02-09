// src/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { FiSquare, FiHeart, FiUser, FiSettings, FiBookmark } from "react-icons/fi";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar main">

      <Link to="/" className="sidebar-item">
        <FiSquare />
        <span>Dashboard</span>
      </Link>

      <Link to="/likes" className="sidebar-item">
        <FiHeart />
        <span>Likes</span>
      </Link>

      <Link to="/user" className="sidebar-item">
        <FiUser />
        <span>Account</span>
      </Link>

      <Link to="/contact" className="sidebar-item">
        <FiSettings />
        <span>Setting</span>
      </Link>

      <Link to="/analytics" className="sidebar-item">
        <FaRegComment />
        <span>Comments</span>
      </Link>

      <Link to="/analytics" className="sidebar-item">
        <FiBookmark />
        <span>Bookmarks</span>
      </Link>

    </div>
  );
};

export default Sidebar;
