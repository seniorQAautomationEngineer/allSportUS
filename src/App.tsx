import { AthleteProfileForm } from "./components/athlete-profile-form";
import "./index.css";
import "./components/styles/markdown.css";
import './components/styles/react-select.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import SearchScreen from "./components/SearchScreen";
import LoginRegister from "./components/LoginRegister";
import LandingPage from "./components/LandingPage";
import { ContactPage } from "./components/ContactFormData";
import LoginFormData from "./components/LoginFormData";
import CreateAccount from "./components/CreateAccount";
import AdditionalInfo from "./components/AdditionalInfo";
import AboutUs from "./components/AboutUs";
import FAQPage from "./components/FaqPage";
import UserProfile from "./components/UserProfile";;
// import AthleteProfileSearch from './components/AthleteProfileSearch';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSave = (data: any) => {
    console.log('Saved data:', data);
    // Here you would typically send this data to a server or update app state
  };

  // Monitor Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once the auth state is determined
    });

    return () => unsubscribe();
  }, []);

  // Secure Route Component
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (loading) return <div>Loading...</div>; // Show loading indicator while checking auth
    return user ? children : <Navigate to="/home" />;
  };

  // Redirect for `/` based on authentication state
  const HomeRoute = () => {
    if (loading) return <div>Loading...</div>; // Show loading indicator
    return user ? <Navigate to="/search" /> : <Navigate to="/home" />;
  };

  return (
    <Router>
      <Routes>
        {/* Conditional route for the main screen */}
        <Route path="/" element={<HomeRoute />} />

        {/* Public Routes */}
        <Route path="/home" element={<LandingPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/login" element={<LoginFormData/>} />
        <Route path="/faq" element={<FAQPage/>} />
        <Route path="/signup" element={<CreateAccount/>} />
        <Route path="/additional-info" element={<AdditionalInfo/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/profile" element={<UserProfile/>} />

        {/* Private Routes */}
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <AthleteProfileForm onSave={handleSave} initialData={{}} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
