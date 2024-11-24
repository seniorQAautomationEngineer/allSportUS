// Loader.tsx
import React from 'react';
import './Loader.css';


const Loader: React.FC = () => {
  return (
    <div className="loading-container">
      <img src="/images/swimmer.gif" alt="Loading..." className="loading-gif" />
    </div>
  );
};


export default Loader;
