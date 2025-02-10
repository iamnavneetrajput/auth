import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface NotificationProps {
  message: string | null;
  type: 'success' | 'error';
  clearMessage: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, clearMessage }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(clearMessage, 2000);
    return () => clearTimeout(timer);
  }, [message, clearMessage]);

  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <div className="notification-icon">
        {type === 'success' ? <FiCheckCircle /> : <FiXCircle />}
      </div>
      <div className="notification-message">{message}</div>
    </div>
  );
};

export default Notification;
