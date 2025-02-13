import React from "react";

interface ReadTimeProps {
  time: number; // Read time in minutes
}

const ReadTime: React.FC<ReadTimeProps> = ({ time }) => {
  return <span className="read-time">{time} min read</span>;
};

export default ReadTime;
