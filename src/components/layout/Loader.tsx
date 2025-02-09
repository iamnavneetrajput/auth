import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="Loader main">
      <div className="cover skeleton"></div>

      <div className="Loader-content">
        <h2 className="skeleton"></h2>
        <small className="skeleton"></small>
        <p className="skeleton"></p>
      </div>
    </div>
  );
};

export default Loader;
