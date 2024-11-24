import React from 'react';
import { useLocation } from 'react-router-dom';
import Link from './link';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <header className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">USPORT.AI</Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            location.pathname !== item.path && (
              <Link key={item.name} to={item.path} className="linkToPage">
                {item.name}
              </Link>
            )
          ))}
          <Link to="/sign-up">
            <button className="px-4 py-2 rounded-full border border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white transition-colors">
              Sign Up
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;