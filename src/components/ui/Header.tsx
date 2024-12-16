import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { User, signOut } from 'firebase/auth';
import { LogOut, UserIcon } from 'lucide-react';

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { text: 'Home', path: '/home', condition: !user },
    { text: 'Search', path: '/search', condition: user },
    { text: 'About Us', path: '/about', condition: true },
    { text: 'Contact', path: '/contact', condition: true },
    { text: 'FAQ', path: '/faq', condition: true },
  ];

  // Return no header for `/additional-info` route
  if (location.pathname === '/additional-info') {
    return null;
  }

  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">U</span>
              </div>
              <span className="text-xl font-bold">USPORT.AI</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(
              (link) =>
                link.condition &&
                location.pathname !== link.path && ( // Ensure only the current path is excluded
                  <Link
                    key={link.text}
                    to={link.path}
                    className="text-white/90 hover:text-white transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                )
            )}
            {user ? (
              <>
                {location.pathname !== '/profile' && (
                  <Link
                    to="/profile"
                    className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <Link
                    to="/login"
                    className="text-white/90 hover:text-white transition-colors duration-200"
                  >
                    Login
                  </Link>
                )}
                {location.pathname !== '/signup' && (
                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <span>Sign Up</span>
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
