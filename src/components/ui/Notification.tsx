import React from 'react';

interface NotificationProps {
  message: string;
  type: 'error' | 'success';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const bgColor = type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-md shadow-lg">
      <div className={`${bgColor} p-4 rounded-md`}>
        {message}
      </div>
    </div>
  );
};

export default Notification;

