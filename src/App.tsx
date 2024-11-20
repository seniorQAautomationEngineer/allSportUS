import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Search from "./components/Search";
import LoginRegister from "./components/LoginRegister";  // Import combined Login/Register component
import LandingPage from "./components/LandingPage";
import {ContactPage} from "./components/ContactFormData";
import LoginFormData from "./components/LoginFormData";
import './index.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Monitor Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the logged-in user or null
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* If user is logged in, show Home, otherwise redirect to login */}
        <Route path="/" element={user ? <Search/> : <Navigate to="/home" />} />
        <Route path="/home" element={<LandingPage />} /> 
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/login" element={<LoginFormData/>}/>
        <Route path="/search" element={<Search />} /> 
      </Routes>
    </Router>
  );
};

export default App;
