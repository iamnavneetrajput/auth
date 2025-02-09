import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  expandIcon: React.ReactNode;
  navigateTo: string;
  button: React.ReactNode;
  image: string;
  text: string;
}

const GridItem: React.FC<GridItemProps> = ({ icon, title, expandIcon, navigateTo, button, image, text }) => {
  const navigate = useNavigate();

  const handleExpandClick = () => {
    navigate(navigateTo);
  };

  return (
    <div className="grid-item">
      <div className="header">
        <div className="left-icon">{icon}</div>
        <div className="title">{title}</div>
        <div className="right-icon" onClick={handleExpandClick}>
          {expandIcon}
        </div>
      </div>

      {/* Additional content added below */}
      <div className="content-scroll">
      <div className="content-item">
        <div className="content-image">
          <img src={image} alt="Image" />
        </div>
        <div className="content-text">
          <p>{text}</p>
        </div>
        <div className="action-buttons">
          <button className="btn">{icon}</button>
          <button className="btn">{button}</button>
          </div>
        </div>
    </div>
    </div>
  );
};

export default GridItem;
