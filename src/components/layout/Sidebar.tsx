import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import {
  FiChevronDown,
  FiChevronRight,
  FiTrendingUp,
  FiRefreshCw,
  FiFilter,
  FiBookmark,
  FiList,
  FiClock,
} from "react-icons/fi";

const Sidebar: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="sidebar main">
      {/* Filter By (Dropdown) */}
      <div className="sidebar-item" onClick={() => setIsFilterOpen(!isFilterOpen)}>
        <div className="sidebar-label">
          <FiFilter className="sidebar-icon" />
          <span>Filter By</span>
        </div>
        {isFilterOpen ? <FiChevronDown /> : <FiChevronRight />}
      </div>

      <div className={`sidebar-submenu ${isFilterOpen ? "open" : ""}`}>
        <Link to="/filter/popular" className="sidebar-subitem">
          <span>Popular</span>
        </Link>
        <Link to="/filter/recent" className="sidebar-subitem">
          <span>Recent</span>
        </Link>
        <Link to="/filter/top-rated" className="sidebar-subitem">
          <span>Top Rated</span>
        </Link>
      </div>

      {/* Categories Dropdown */}
      <div className="sidebar-item" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
        <div className="sidebar-label">
          <FiList className="sidebar-icon" />
          <span>Categories</span>
        </div>
        {isCategoriesOpen ? <FiChevronDown /> : <FiChevronRight />}
      </div>

      <div className={`sidebar-submenu ${isCategoriesOpen ? "open" : ""}`}>
        <Link to="/category/technology" className="sidebar-subitem">
          <span>Technology</span>
        </Link>
        <Link to="/category/lifestyle" className="sidebar-subitem">
          <span>Lifestyle</span>
        </Link>
        <Link to="/category/education" className="sidebar-subitem">
          <span>Education</span>
        </Link>
        <Link to="/category/health" className="sidebar-subitem">
          <span>Health</span>
        </Link>
      </div>

      {/* Sort By Dropdown */}
      <div className="sidebar-item" onClick={() => setIsSortOpen(!isSortOpen)}>
        <div className="sidebar-label">
          <FiClock className="sidebar-icon" />
          <span>Sort By</span>
        </div>
        {isSortOpen ? <FiChevronDown /> : <FiChevronRight />}
      </div>

      <div className={`sidebar-submenu ${isSortOpen ? "open" : ""}`}>
        <Link to="/sort/newest" className="sidebar-subitem">
          <span>Newest</span>
        </Link>
        <Link to="/sort/oldest" className="sidebar-subitem">
          <span>Oldest</span>
        </Link>
      </div>

      {/* Static Links with Proper Alignment */}
      <Link to="/trending" className="sidebar-item">
        <div className="sidebar-label">
          <FiTrendingUp className="sidebar-icon" />
          <span>Trending</span>
        </div>
      </Link>

      <Link to="/recent" className="sidebar-item">
        <div className="sidebar-label">
          <FiRefreshCw className="sidebar-icon" />
          <span>Recent Updates</span>
        </div>
      </Link>

      <Link to="/comments" className="sidebar-item">
        <div className="sidebar-label">
          <FaRegComment className="sidebar-icon" />
          <span>Comments</span>
        </div>
      </Link>

      <Link to="/bookmarks" className="sidebar-item">
        <div className="sidebar-label">
          <FiBookmark className="sidebar-icon" />
          <span>Bookmarks</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
