import React from 'react';

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`${bgColor} text-white px-6 py-3 rounded-md shadow-lg`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;

