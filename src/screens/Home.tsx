import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the College Scholarship Finder</h1>
      <p>Please choose an option:</p>
      <div className="home-buttons">
        <Link to="/login">
          <button className="btn">Sign In</button>
        </Link>
        <Link to="/register">
          <button className="btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
