import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Home from "./components/Home";
import Search from "./components/Search";
import LoginRegister from "./components/LoginRegister";  // Import combined Login/Register component

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
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginRegister />} /> {/* Combined Login/Registration */}
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;
