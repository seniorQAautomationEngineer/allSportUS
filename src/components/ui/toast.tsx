import React from 'react';

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded-md text-sm mt-2`}>
      {message}
    </div>
  );
};

export default Toast;

